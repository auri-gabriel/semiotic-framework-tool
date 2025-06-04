import { Question } from '../model/Question';
import { Level } from '../model/Level';

export async function readQuestions() {
  const res = await fetch('/src/assets/definitions/questions.xml');
  const text = await res.text();
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(text, 'application/xml');
  const questionNodes = doc.querySelectorAll('question');
  const questions = [];
  questionNodes.forEach((q) => {
    let level = q.getAttribute('level');
    let text = q.querySelector('text')?.textContent;
    let question = new Question(text, level, []);
    questions.push(question);
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
    levels[id] = new Level(id, name);
  });
  return levels;
}

export async function readQuestionsAndLevels() {
  let levels = await readLevels();
  let questions = await readQuestions();
  return { levels, questions };
}
