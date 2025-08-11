import definitionsXML from '../assets/definitions/definitions.xml?raw';

export function exportAnswersAsJSON(answers) {
  return {
    data: JSON.stringify(answers, null, 2),
    mimeType: 'application/json',
    fileName: 'answers.json',
  };
}

export function exportAnswersAsCSV(answers) {
  const rows = Object.entries(answers).map(
    ([k, v]) => `${k},"${String(v).replace(/"/g, '""')}"`
  );
  const data = 'QuestionID,Answer\n' + rows.join('\n');
  return {
    data,
    mimeType: 'text/csv',
    fileName: 'answers.csv',
  };
}

export function exportAnswersAsXML(answers) {
  // answers: { [questionId]: answer }
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
