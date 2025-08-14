import { XmlReaderService } from '../data/services/XmlReaderService.js';

export async function getQuestionsGroupedBySemiotics() {
  const tags = await XmlReaderService.readTags();
  const questions = await XmlReaderService.readQuestions();

  const semioticGroups = tags.filter((tag) => tag.type === 'semiotic-group');
  const semioticSteps = tags.filter((tag) => tag.type === 'semiotic-steps');

  const groupMap = {};

  // Initialize the top-level structure for each semiotic group
  semioticGroups.forEach((group) => {
    groupMap[group.id] = {
      tag: group,
      steps: {},
    };
  });

  // For each semiotic step, determine which group it belongs to and initialize its entry
  semioticSteps.forEach((step) => {
    const parentGroupTag = step.tags?.[0]?.id;
    if (groupMap[parentGroupTag]) {
      groupMap[parentGroupTag].steps[step.id] = {
        tag: step,
        questions: [],
      };
    }
  });

  // Assign each question to the correct step within the correct group
  questions.forEach((q) => {
    q.tags?.forEach((tagRef) => {
      const step = semioticSteps.find((s) => s.id === tagRef);
      if (step) {
        const parentGroupTag = step.tags?.[0]?.id;
        if (
          parentGroupTag &&
          groupMap[parentGroupTag] &&
          groupMap[parentGroupTag].steps[step.id]
        ) {
          groupMap[parentGroupTag].steps[step.id].questions.push(q);
        }
      }
    });
  });

  return groupMap;
}
