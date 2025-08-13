// Re-export services for backward compatibility and clean API
export { XmlService } from './services/XmlService.js';
export { PdfService } from './services/PdfService.js';
export { HtmlTemplateService } from './services/HtmlTemplateService.js';
export { SemioticLadderService } from './services/SemioticLadderService.js';
export { EngineeringLayersService } from './services/EngineeringLayersService.js';

// Legacy function exports for backward compatibility
export {
  exportAnswersAsXML,
  importAnswersFromXML,
} from './services/XmlService.js';

// Import services for legacy functions
import { SemioticLadderService } from './services/SemioticLadderService.js';
import { EngineeringLayersService } from './services/EngineeringLayersService.js';

/**
 * Legacy function for exporting Semiotic Ladder document
 * @deprecated Use SemioticLadderService.exportDocument instead
 */
export async function exportSemioticLadderDoc(params) {
  return SemioticLadderService.exportDocument(params);
}

/**
 * Legacy function for exporting Engineering Layers document
 * @deprecated Use EngineeringLayersService.exportDocument instead
 */
export async function exportEngineeringLayers(params) {
  return EngineeringLayersService.exportDocument(params);
}
