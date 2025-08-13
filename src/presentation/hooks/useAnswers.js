import { useCallback } from 'react';
import { useApp } from './useApp';

export function useAnswers() {
  const { state, actions } = useApp();

  const updateAnswer = useCallback(
    (questionId, value) => {
      actions.updateAnswer(questionId, value);
    },
    [actions]
  );

  const importAnswers = useCallback(
    (xmlString) => {
      actions.handleImportXML(xmlString);
    },
    [actions]
  );

  return {
    answers: state.answers,
    updateAnswer,
    importAnswers,
  };
}
