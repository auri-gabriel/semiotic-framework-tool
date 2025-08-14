import { DATA_CONFIG } from '../config.js';
import { XmlReaderService } from './XmlReaderService.js';

/**
 * Service for handling XML import/export operations
 */
export class XmlService {
  /**
   * Fetches the definitions XML from the public folder
   * @returns {Promise<string>} The XML content as string
   */
  static async fetchDefinitionsXML() {
    try {
      const response = await fetch(DATA_CONFIG.XML_DEFINITIONS_PATH);
      if (!response.ok) {
        throw new Error(`Failed to fetch definitions XML: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error('[XmlService] Error fetching definitions XML:', error);
      throw error;
    }
  }

  /**
   * Exports answers as XML format
   * @param {Object} answers - Object with questionId as key and answer as value
   * @returns {Promise<Object>} Export result with data, mimeType, and fileName
   */
  static async exportAnswersAsXML(answers) {
    // Use custom definitions if available, otherwise fetch from default location
    let definitionsXML;
    const customDefinitions = XmlReaderService.getCustomDefinitions();

    if (customDefinitions) {
      definitionsXML = customDefinitions;
    } else {
      definitionsXML = await this.fetchDefinitionsXML();
    }

    const answersXML = `<answers>\n${Object.entries(answers)
      .map(
        ([k, v]) =>
          `  <answer id="${k}">${String(v).replace(
            /[<>&]/g,
            (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])
          )}</answer>`
      )
      .join('\n')}\n</answers>`;

    // Remove XML declaration from definitions if present
    const cleanedDefinitions = definitionsXML.replace(/<\?xml.*?\?>\s*/i, '');

    // Compose final XML with declaration, definitions, and answers
    const data =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<exported-semiotic-framework>\n` +
      cleanedDefinitions.trim() +
      '\n' +
      answersXML +
      '\n</exported-semiotic-framework>';

    return {
      data,
      mimeType: 'application/xml',
      fileName: 'answers.xml',
    };
  }

  /**
   * Imports answers from XML string
   * @param {string} xmlString - XML string to parse
   * @returns {Object} Imported answers object
   */
  static importAnswersFromXML(xmlString) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, 'application/xml');
    const answerNodes = xml.getElementsByTagName('answer');
    const imported = {};

    for (let node of answerNodes) {
      imported[node.getAttribute('id')] = node.textContent;
    }

    return imported;
  }

  /**
   * Imports both definitions and answers from XML string
   * @param {string} xmlString - XML string to parse
   * @returns {Object} Object containing definitions (if any) and answers
   */
  static importFromXML(xmlString) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, 'application/xml');

    const result = {
      answers: {},
      definitions: null,
    };

    // Check if this is an exported-semiotic-framework with definitions
    const exportedFramework = xml.querySelector('exported-semiotic-framework');
    if (exportedFramework) {
      // Extract definitions if they exist
      const definitionsNode = exportedFramework.querySelector('definitions');
      if (definitionsNode) {
        // Store the definitions as XML string for later use
        const serializer = new XMLSerializer();
        result.definitions = `<?xml version="1.0" encoding="UTF-8"?>\n${serializer.serializeToString(
          definitionsNode
        )}`;
      }
    }

    // Extract answers (works for both old format and new format)
    const answerNodes = xml.getElementsByTagName('answer');
    for (let node of answerNodes) {
      result.answers[node.getAttribute('id')] = node.textContent;
    }

    return result;
  }

  /**
   * Parses engineering layer tags from definitions XML
   * @returns {Promise<Object>} Engineering tags mapped by ID
   */
  static async getEngineeringTags() {
    const definitionsXML = await this.fetchDefinitionsXML();

    const parser = new DOMParser();
    const definitions = parser.parseFromString(
      definitionsXML,
      'application/xml'
    );
    const engineeringTags = {};

    definitions
      .querySelectorAll('tag[type="engineering-layer"]')
      .forEach((tag) => {
        const id = tag.getAttribute('id');
        const order = parseInt(tag.getAttribute('order'));
        const names = {};

        tag.querySelectorAll('name').forEach((name) => {
          names[name.getAttribute('lang')] = name.textContent.trim();
        });

        engineeringTags[id] = { id, order, names };
      });

    return engineeringTags;
  }
}

// Legacy named exports for backward compatibility
export const exportAnswersAsXML = XmlService.exportAnswersAsXML;
export const importAnswersFromXML = XmlService.importAnswersFromXML;
export const importFromXML = XmlService.importFromXML;
