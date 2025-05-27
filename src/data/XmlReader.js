export async function readQuestions() {
  const res = await fetch('/src/assets/definitions/questions.xml');
  const text = await res.text();
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(text, 'application/xml');
  const questionNodes = doc.querySelectorAll('question');
  const questions = [];
  questionNodes.forEach((q) => {
    questions.push({
      level: q.getAttribute('level'),
      text: q.querySelector('text')?.textContent,
    });
  });
  return questions;
}

export async function readLevels() {
  const res = await fetch('/src/assets/definitions/levels.xml');
  const text = await res.text();
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(text, 'application/xml');
  const levelNodes = doc.querySelectorAll('level');
  const levels = {};
  levelNodes.forEach((level) => {
    const id = level.getAttribute('id');
    let name = level.querySelector('name[lang="en"]')?.textContent;
    if (!name) name = level.querySelector('name')?.textContent;
    levels[id] = name;
  });
  return levels;
}
