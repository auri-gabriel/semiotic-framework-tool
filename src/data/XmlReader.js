import { Question } from '../model/Question';
import { Tag } from '../model/Level';

function readElement (elementDefinitions, elementName) {
  const elementNodes = elementDefinitions.querySelectorAll(elementName);
  const elements = [];
  elementNodes.forEach((q) => {
    let tagsNodes = q.querySelector('tag');
    let tags = [];

    tagsNodes.forEach((tag) => {
      tags.push(
        {
          id: tag.getAttribute('id'),
        }
      )
    });


    let textNodes = q.querySelector('text');
    let text = [];

    textNodes.forEach((text) => {
      text.push(
        {
          language: text.getAttribute('lang'),
          text: text.textContent,
        }
      );
    });

    let nameNodes = q.querySelector('name');
    let names = [];

    nameNodes.forEach((name) => {
      names.push(
        {
          language: name.getAttribute('lang'),
          name: name.nameContent,
        }
      );
    });

    let descriptionNodes = q.querySelector('description');
    let descriptions = [];

    descriptionNodes.forEach((description) => {
      descriptions.push(
        {
          language: description.getAttribute('lang'),
          description: description.descriptionContent,
        }
      );
    });

    elements.push({
      text: text,
      tags: tags,
    });
  });
  return elements;
}

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
