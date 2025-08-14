import { DATA_CONFIG } from '../config.js';

/**
 * Service for reading and parsing XML definitions
 * Provides methods to read questions and tags from XML files
 */
export class XmlReaderService {
  /**
   * Configuration constants for XML reading
   */
  static CONFIG = {
    XML_FILE_PATH: DATA_CONFIG.XML_DEFINITIONS_PATH,
    DEFAULT_LANGUAGE: DATA_CONFIG.DEFAULT_LANGUAGE,
    LOG_PREFIX: DATA_CONFIG.LOGGING.PREFIX,
  };

  /**
   * Helper function to process language-based nodes (text, name, description, placeholder)
   * @param {NodeList} nodes - The nodes to process
   * @param {string} nodeType - Type of node for logging
   * @param {string} elementName - Name of parent element for logging
   * @param {string} elementId - ID of parent element for logging
   * @returns {Object} Object with language keys and text content values
   */
  static processLanguageNodes(nodes, nodeType, elementName, elementId) {
    const result = {};

    nodes.forEach((node, index) => {
      const lang = node.getAttribute('lang');
      if (!lang) {
        console.warn(
          `${this.CONFIG.LOG_PREFIX} <${nodeType}> in '${elementName}' id='${elementId}' at ${nodeType} index ${index} missing 'lang' attribute.`
        );
        return;
      }
      result[lang] = node.textContent;
    });

    return result;
  }

  /**
   * Helper function to process tag nodes with type information
   * @param {NodeList} tagNodes - The tag nodes to process
   * @param {Document} ownerDocument - The XML document for tag definitions lookup
   * @param {string} elementName - Name of parent element for logging
   * @param {string} elementId - ID of parent element for logging
   * @returns {Array} Array of tag objects with id and type
   */
  static processTags(tagNodes, ownerDocument, elementName, elementId) {
    const tags = [];

    tagNodes.forEach((tag, tagIndex) => {
      const tagId = tag.getAttribute('id');

      if (!tagId) {
        console.warn(
          `${this.CONFIG.LOG_PREFIX} <tag> in '${elementName}' id='${elementId}' at tag index ${tagIndex} missing 'id' attribute.`
        );
        return;
      }

      // Find the tag definition to get its type
      const tagDefinition = ownerDocument.querySelector(
        `tag-definitions > tag[id="${tagId}"]`
      );
      const tagType = tagDefinition ? tagDefinition.getAttribute('type') : null;

      tags.push({
        id: tagId,
        type: tagType,
      });
    });

    return tags;
  }

  /**
   * Reads and parses elements from XML definitions
   * @param {Element} elementDefinitions - The parent element containing definitions
   * @param {string} elementName - The name of elements to read
   * @returns {Array} Array of parsed element objects
   */
  static readElements(elementDefinitions, elementName) {
    if (!elementDefinitions) {
      console.error(
        `${this.CONFIG.LOG_PREFIX} Element definitions node for '${elementName}' not found.`
      );
      return [];
    }

    const elementNodes = elementDefinitions.querySelectorAll(elementName);
    const elements = [];

    if (elementNodes.length === 0) {
      console.warn(
        `${this.CONFIG.LOG_PREFIX} No '${elementName}' elements found.`
      );
    }

    elementNodes.forEach((elementNode, index) => {
      const elementId = elementNode.getAttribute('id');
      const elementType = elementNode.getAttribute('type');
      const elementOrder = elementNode.getAttribute('order');

      if (!elementId) {
        console.warn(
          `${this.CONFIG.LOG_PREFIX} '${elementName}' at index ${index} is missing required 'id' attribute.`
        );
      }

      // Process tags
      const tagNodes = elementNode.querySelectorAll('tag');
      const tags = this.processTags(
        tagNodes,
        elementDefinitions.ownerDocument,
        elementName,
        elementId
      );

      // Process language-based nodes
      const textNodes = elementNode.querySelectorAll('text');
      const texts = this.processLanguageNodes(
        textNodes,
        'text',
        elementName,
        elementId
      );

      const nameNodes = elementNode.querySelectorAll('name');
      const names = this.processLanguageNodes(
        nameNodes,
        'name',
        elementName,
        elementId
      );

      const descriptionNodes = elementNode.querySelectorAll('description');
      const descriptions = this.processLanguageNodes(
        descriptionNodes,
        'description',
        elementName,
        elementId
      );

      const placeholderNodes = elementNode.querySelectorAll('placeholder');
      const placeholders = this.processLanguageNodes(
        placeholderNodes,
        'placeholder',
        elementName,
        elementId
      );

      // Build element object
      const element = {};
      if (elementId) element.id = elementId;
      if (elementType) element.type = elementType;
      if (elementOrder) {
        element.order = Number(elementOrder);
      } else {
        element.order = index + 1; // fallback to XML document order
      }
      if (Object.keys(names).length > 0) element.names = names;
      if (Object.keys(descriptions).length > 0)
        element.descriptions = descriptions;
      if (Object.keys(texts).length > 0) element.texts = texts;
      if (tags.length > 0) element.tags = tags;
      if (Object.keys(placeholders).length > 0)
        element.placeholders = placeholders;

      elements.push(element);
    });

    // Sort by 'order'
    return elements.sort((a, b) => a.order - b.order);
  }

  /**
   * Fetches and parses the XML definitions file
   * @param {string} xmlFilePath - Path to the XML file (optional, uses config default)
   * @returns {Promise<Document>} Parsed XML document
   * @throws {Error} If fetch fails or XML parsing fails
   */
  static async fetchAndParseXml(xmlFilePath = this.CONFIG.XML_FILE_PATH) {
    try {
      const response = await fetch(xmlFilePath);

      if (!response.ok) {
        const errorMessage = `Failed to fetch definitions.xml: ${response.status} ${response.statusText}`;
        console.error(`${this.CONFIG.LOG_PREFIX} ${errorMessage}`);
        throw new Error(errorMessage);
      }

      const xmlText = await response.text();
      const parser = new window.DOMParser();
      const xmlDocument = parser.parseFromString(xmlText, 'application/xml');

      const parseError = xmlDocument.querySelector('parsererror');
      if (parseError) {
        const errorMessage = `XML parsing error: ${parseError.textContent}`;
        console.error(`${this.CONFIG.LOG_PREFIX} ${errorMessage}`);
        throw new Error(errorMessage);
      }

      return xmlDocument;
    } catch (error) {
      console.error(
        `${this.CONFIG.LOG_PREFIX} Error in fetchAndParseXml:`,
        error
      );
      throw error;
    }
  }

  /**
   * Enhances questions with categorized tag information
   * @param {Array} questions - Array of question objects
   * @returns {Array} Enhanced questions with tag categorization
   */
  static enhanceQuestionsWithTags(questions) {
    return questions.map((question) => {
      if (!question.tags || question.tags.length === 0) {
        return {
          ...question,
          tags: [],
          semioticTags: [],
          engineeringTags: [],
        };
      }

      // Convert tags array to include both semiotic and engineering tags
      const enhancedTags = question.tags.map((tag) => tag.id);
      const semioticTags = question.tags
        .filter((tag) => tag.type === 'semiotic-steps')
        .map((tag) => tag.id);
      const engineeringTags = question.tags
        .filter((tag) => tag.type === 'engineering-layer')
        .map((tag) => tag.id);

      return {
        ...question,
        tags: enhancedTags,
        semioticTags,
        engineeringTags,
      };
    });
  }

  /**
   * Reads and parses questions from the XML definitions file
   * @param {string} xmlFilePath - Optional custom path to XML file
   * @returns {Promise<Array>} Array of question objects with enhanced tag information
   * @throws {Error} If XML file cannot be fetched, parsed, or doesn't contain questions
   */
  static async readQuestions(xmlFilePath) {
    try {
      const xmlDocument = await this.fetchAndParseXml(xmlFilePath);

      const questionDefinitions = xmlDocument.querySelector(
        'questions-definitions'
      );
      if (!questionDefinitions) {
        const errorMessage = '<questions-definitions> section missing in XML.';
        console.error(`${this.CONFIG.LOG_PREFIX} ${errorMessage}`);
        throw new Error(
          `No <questions-definitions> section found in the XML file.`
        );
      }

      const questions = this.readElements(questionDefinitions, 'question');
      return this.enhanceQuestionsWithTags(questions);
    } catch (error) {
      console.error(
        `${this.CONFIG.LOG_PREFIX} Error reading questions:`,
        error
      );
      throw error;
    }
  }

  /**
   * Reads and parses tags from the XML definitions file
   * @param {string} xmlFilePath - Optional custom path to XML file
   * @returns {Promise<Array>} Array of tag objects
   * @throws {Error} If XML file cannot be fetched, parsed, or doesn't contain tags
   */
  static async readTags(xmlFilePath) {
    try {
      const xmlDocument = await this.fetchAndParseXml(xmlFilePath);

      const tagDefinitions = xmlDocument.querySelector('tag-definitions');
      if (!tagDefinitions) {
        const errorMessage = '<tag-definitions> section missing in XML.';
        console.error(`${this.CONFIG.LOG_PREFIX} ${errorMessage}`);
        throw new Error('No <tag-definitions> section found in the XML file.');
      }

      const tags = this.readElements(tagDefinitions, 'tag');
      if (!tags || tags.length === 0) {
        console.warn(
          `${this.CONFIG.LOG_PREFIX} No tags found in the XML file.`
        );
      }

      return tags;
    } catch (error) {
      console.error(`${this.CONFIG.LOG_PREFIX} Error reading tags:`, error);
      throw error;
    }
  }
}

// Legacy named exports for backward compatibility
export const readQuestions = XmlReaderService.readQuestions;
export const readTags = XmlReaderService.readTags;
