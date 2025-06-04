import { Question } from '../model/Question';
import { Tag } from '../model/Level';

export async function readQuestions() {
  const res = await fetch('/src/assets/definitions/definitions.xml');
  const text = await res.text();
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(text, 'application/xml');
  const questionDefinitions = doc.querySelector('questions-definitions');
  const questionNodes = questionDefinitions.querySelectorAll('question');
  const questions = [];
  questionNodes.forEach((q) => {
    let level = q.querySelector('tag').getAttribute('id');
    let text = q.querySelector('text[lang="pt_BR"]')?.textContent;
    let question = new Question(text, level, []);
    questions.push(question);
  });
  return questions;
}

export async function readLevels() {
  const res = await fetch('/src/assets/definitions/definitions.xml');
  const text = await res.text();
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(text, 'application/xml');
  const tagDefinitions = doc.querySelector('tag-definitions');
  const tagNodes = tagDefinitions.querySelectorAll('tag');
  const tags = {};
  tagNodes.forEach((tag) => {
    const id = tag.getAttribute('id');
    let name = tag.querySelector('name[lang="pt_BR"]')?.textContent;
    if (!name) { 
      name = tag.querySelector('name')?.textContent; 
    }
    tags[id] = new Tag(id, name);
  });
  return tags;
}

export async function readQuestionsAndLevels() {
  let levels = await readLevels();
  let questions = await readQuestions();
  return { levels, questions };
}
