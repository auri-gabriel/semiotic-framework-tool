function readElements(elementDefinitions, elementName) {
  if (!elementDefinitions) {
    console.error(
      `[XmlReader] Element definitions node for '${elementName}' not found.`
    );
    return [];
  }

  const elementNodes = elementDefinitions.querySelectorAll(elementName);
  const elements = [];

  if (elementNodes.length === 0) {
    console.warn(`[XmlReader] No '${elementName}' elements found.`);
  }

  elementNodes.forEach((elementNode, idx) => {
    let elementId = elementNode.getAttribute('id');
    let elementType = elementNode.getAttribute('type');
    let elementOrder = elementNode.getAttribute('order'); // <-- NEW

    if (!elementId) {
      console.warn(
        `[XmlReader] '${elementName}' at index ${idx} is missing required 'id' attribute.`
      );
    }

    let tagsNodes = elementNode.querySelectorAll('tag');
    let tags = [];
    tagsNodes.forEach((tag, tagIdx) => {
      const tagId = tag.getAttribute('id');
      if (!tagId) {
        console.warn(
          `[XmlReader] <tag> in '${elementName}' id='${elementId}' at tag index ${tagIdx} missing 'id' attribute.`
        );
      }
      tags.push({ id: tagId });
    });

    let textNodes = elementNode.querySelectorAll('text');
    let texts = {};
    textNodes.forEach((text, textIdx) => {
      const lang = text.getAttribute('lang');
      if (!lang) {
        console.warn(
          `[XmlReader] <text> in '${elementName}' id='${elementId}' at text index ${textIdx} missing 'lang' attribute.`
        );
      }
      texts[lang] = text.textContent;
    });

    let nameNodes = elementNode.querySelectorAll('name');
    let names = {};
    nameNodes.forEach((name, nameIdx) => {
      const lang = name.getAttribute('lang');
      if (!lang) {
        console.warn(
          `[XmlReader] <name> in '${elementName}' id='${elementId}' at name index ${nameIdx} missing 'lang' attribute.`
        );
      }
      names[lang] = name.textContent;
    });

    let descriptionNodes = elementNode.querySelectorAll('description');
    let descriptions = {};
    descriptionNodes.forEach((description, descIdx) => {
      const lang = description.getAttribute('lang');
      if (!lang) {
        console.warn(
          `[XmlReader] <description> in '${elementName}' id='${elementId}' at description index ${descIdx} missing 'lang' attribute.`
        );
      }
      descriptions[lang] = description.textContent;
    });

    let element = {};
    if (elementId) element['id'] = elementId;
    if (elementType) element['type'] = elementType;
    if (elementOrder) {
      element['order'] = Number(elementOrder);
    } else {
      element['order'] = idx + 1; // fallback to XML document order
    }
    if (Object.keys(names).length !== 0) element['names'] = names;
    if (Object.keys(descriptions).length !== 0)
      element['descriptions'] = descriptions;
    if (Object.keys(texts).length !== 0) element['texts'] = texts;
    if (tags.length !== 0) element['tags'] = tags;

    elements.push(element);
  });

  // Sort by 'order'
  return elements.sort((a, b) => a.order - b.order);
}

export async function readQuestions() {
  try {
    const res = await fetch('/src/assets/definitions/definitions.xml');
    if (!res.ok) {
      console.error(
        `[XmlReader] Failed to fetch definitions.xml: ${res.status} ${res.statusText}`
      );
      throw new Error('Failed to fetch definitions.xml');
    }

    const text = await res.text();
    const parser = new window.DOMParser();
    const doc = parser.parseFromString(text, 'application/xml');

    if (doc.querySelector('parsererror')) {
      console.error(
        '[XmlReader] XML parsing error:',
        doc.querySelector('parsererror').textContent
      );
      throw new Error('XML parsing error');
    }

    const questionDefinitions = doc.querySelector('questions-definitions');
    if (!questionDefinitions) {
      console.error(
        '[XmlReader] <questions-definitions> section missing in XML.'
      );
      throw new Error(
        'No <questions-definitions> section found in the XML file.'
      );
    }

    let questions = readElements(questionDefinitions, 'question');
    if (!questions || questions.length === 0) {
      console.error('[XmlReader] No questions found in the XML file.');
      throw new Error('No questions found in the XML file.');
    }

    return questions;
  } catch (err) {
    console.error('[XmlReader] Error reading questions:', err);
    throw err;
  }
}

export async function readTags() {
  try {
    const res = await fetch('/src/assets/definitions/definitions.xml');
    if (!res.ok) {
      console.error(
        `[XmlReader] Failed to fetch definitions.xml: ${res.status} ${res.statusText}`
      );
      throw new Error('Failed to fetch definitions.xml');
    }

    const text = await res.text();
    const parser = new window.DOMParser();
    const doc = parser.parseFromString(text, 'application/xml');

    if (doc.querySelector('parsererror')) {
      console.error(
        '[XmlReader] XML parsing error:',
        doc.querySelector('parsererror').textContent
      );
      throw new Error('XML parsing error');
    }

    const tagDefinitions = doc.querySelector('tag-definitions');
    if (!tagDefinitions) {
      console.error('[XmlReader] <tag-definitions> section missing in XML.');
      throw new Error('No <tag-definitions> section found in the XML file.');
    }

    const tags = readElements(tagDefinitions, 'tag');
    if (!tags || tags.length === 0) {
      console.warn('[XmlReader] No tags found in the XML file.');
    }

    return tags;
  } catch (err) {
    console.error('[XmlReader] Error reading tags:', err);
    throw err;
  }
}
