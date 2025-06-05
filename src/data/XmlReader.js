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
    let texts = [];

    textNodes.forEach((text) => {
      texts.push(
        {
          language: text.getAttribute('lang'),
          text: text.textContent,
        }
      );
    });

    let nameNodes = elementNode.querySelectorAll('name');
    let names = [];

    nameNodes.forEach((name) => {
      names.push(
        {
          language: name.getAttribute('lang'),
          name: name.nameContent,
        }
      );
    });

    let descriptionNodes = elementNode.querySelectorAll('description');
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
      names: names,
      descriptions: descriptions,
      texts: texts,
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
  let questions = readElements(questionDefinitions, 'question');

  if (!questions || questions.length === 0) {
    throw new Error('No questions found in the XML file.');
  }


  return questions.map((question) => {
    return new Question(
      question.texts[0].text,
      question.tags
    );
  });
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
