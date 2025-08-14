/**
 * Configuration file for data layer
 *
 * This file contains configuration constants that can be easily modified
 * to customize the behavior of data reading operations.
 */

// Helper function to get the correct base path for assets
const getBasePath = () => {
  // In development, use the dev server base
  if (import.meta.env.DEV) {
    return '';
  }
  // In production, use the configured base path
  return import.meta.env.BASE_URL || '/';
};

export const DATA_CONFIG = {
  /**
   * Path to the main XML definitions file
   * This can be modified to point to different files in different environments
   */
  XML_DEFINITIONS_PATH: `${getBasePath()}definitions.xml`,

  /**
   * Default language for fallbacks
   */
  DEFAULT_LANGUAGE: 'pt_BR',

  /**
   * Logging configuration
   */
  LOGGING: {
    PREFIX: '[XmlReader]',
    LEVEL: 'info', // 'debug', 'info', 'warn', 'error'
  },

  /**
   * XML parsing options
   */
  XML_PARSER: {
    MIME_TYPE: 'application/xml',
    VALIDATE_ON_PARSE: true,
  },
};

/**
 * Environment-specific overrides
 * You can uncomment and modify these for different environments
 */

// Development environment
// if (process.env.NODE_ENV === 'development') {
//   DATA_CONFIG.XML_DEFINITIONS_PATH = '/src/data/assets/definitions/definitions-dev.xml';
//   DATA_CONFIG.LOGGING.LEVEL = 'debug';
// }

// Production environment
// if (process.env.NODE_ENV === 'production') {
//   DATA_CONFIG.LOGGING.LEVEL = 'error';
// }

// Test environment
// if (process.env.NODE_ENV === 'test') {
//   DATA_CONFIG.XML_DEFINITIONS_PATH = '/src/data/assets/definitions/definitions-test.xml';
// }
