function readElements(elementDefinitions, elementName) {
  const elementNodes = elementDefinitions.querySelectorAll(elementName);
  const elements = [];
  elementNodes.forEach((elementNode) => {
    let elementId = elementNode.getAttribute('id');
    let elementType = elementNode.getAttribute('type');

    let tagsNodes = elementNode.querySelectorAll('tag');
    let tags = [];

    tagsNodes.forEach((tag) => {
      tags.push({
        id: tag.getAttribute('id'),
      });
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

    if (elementId) element['id'] = elementId;
    if (elementType) element['type'] = elementType;
    if (Object.keys(names).length !== 0) element['names'] = names;
    if (Object.keys(descriptions).length !== 0)
      element['descriptions'] = descriptions;
    if (Object.keys(texts).length !== 0) element['texts'] = texts;
    if (tags.length !== 0) element['tags'] = tags;

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

  return questions;
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
