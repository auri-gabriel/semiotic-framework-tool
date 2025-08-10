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
  const data = `<answers>\n${Object.entries(answers)
    .map(
      ([k, v]) =>
        `  <answer id="${k}">${String(v).replace(
          /[<>&]/g,
          (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])
        )}</answer>`
    )
    .join('\n')}\n</answers>`;
  return {
    data,
    mimeType: 'application/xml',
    fileName: 'answers.xml',
  };
}
