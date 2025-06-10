import { Question } from '../model/Question';
import { Tag } from '../model/Level';

function readElements (elementDefinitions, elementName) {
  const elementNodes = elementDefinitions.querySelectorAll(elementName);
  const elements = [];
  elementNodes.forEach((elementNode) => {
    let tagsNodes = elementNode.querySelectorAll('tag');
    let tags = [];

    tagsNodes.forEach((tag) => {
      tags.push(
        {
          id: tag.getAttribute('id'),
        }
      )
    });


    let textNodes = elementNode.querySelectorAll('text');
    let texts = {};

    textNodes.forEach((text) => {
      texts[text.getAttribute('lang')] = text.textContent;
    });

    let nameNodes = elementNode.querySelectorAll('name');
    let names = {};

    nameNodes.forEach((name) => {
      names[name.getAttribute('lang')] = name.textContent;
    });

    let descriptionNodes = elementNode.querySelectorAll('description');
    let descriptions = {};

    descriptionNodes.forEach((description) => {
      descriptions[description.getAttribute('lang')] = description.textContent;
    });

    let element = {};

    if (names) element['names'] = names;
    if (descriptions) element['descriptions'] = descriptions;
    if (texts) element['texts'] = texts;
    if (tags) element['tags'] = tags;

    elements.push(element);
  });
  return elements;
}

export async function readQuestions() {
  const res = await fetch('/src/assets/definitions/definitions.xml');
  const text = await res.text();
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(text, 'application/xml');
  const questionDefinitions = doc.querySelector('questions-definitions');
  let questions = readElements(questionDefinitions, 'question');

  if (!questions || questions.length === 0) {
    throw new Error('No questions found in the XML file.');
  }


  return questions.map((question) => {
    return new Question(
      question.texts,
      question.tags
    );
  });
}

export async function readTags() {
  const res = await fetch('/src/assets/definitions/definitions.xml');
  const text = await res.text();
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(text, 'application/xml');
  const tagDefinitions = doc.querySelector('tag-definitions');
  const tags = readElements(tagDefinitions, 'tag');
  return tags;
}

export async function readQuestionsAndTags() {
  let tags = await readTags();
  let questions = await readQuestions();
  return {tags , questions };
}
