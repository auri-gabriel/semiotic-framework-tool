import definitionsXML from '../../assets/definitions/definitions.xml?raw';

/**
 * Service for handling XML import/export operations
 */
export class XmlService {
  /**
   * Exports answers as XML format
   * @param {Object} answers - Object with questionId as key and answer as value
   * @returns {Object} Export result with data, mimeType, and fileName
   */
  static exportAnswersAsXML(answers) {
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
   * Parses engineering layer tags from definitions XML
   * @returns {Object} Engineering tags mapped by ID
   */
  static getEngineeringTags() {
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
