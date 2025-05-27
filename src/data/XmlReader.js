export async function readQuestionsAndLevels() {
  const questionsRes = await fetch('/src/assets/definitions/questions.xml');
  const levelsRes = await fetch('/src/assets/definitions/levels.xml');
  const questionsText = await questionsRes.text();
  const levelsText = await levelsRes.text();

  const parser = new window.DOMParser();
  const questionsDoc = parser.parseFromString(questionsText, 'application/xml');
  const levelsDoc = parser.parseFromString(levelsText, 'application/xml');

  const levelNodes = levelsDoc.querySelectorAll('level');
  const levelsMap = {};
  levelNodes.forEach((level) => {
    const id = level.getAttribute('id');
    let name = level.querySelector('name[lang="en"]')?.textContent;
    if (!name) name = level.querySelector('name')?.textContent;
    levelsMap[id] = name;
  });

  const questionNodes = questionsDoc.querySelectorAll('question');
  const grouped = {};
  questionNodes.forEach((q) => {
    const level = q.getAttribute('level');
    const text = q.querySelector('text')?.textContent;
    if (!grouped[level]) grouped[level] = [];
    grouped[level].push(text);
  });

  return { levels: levelsMap, groupedQuestions: grouped };
}
