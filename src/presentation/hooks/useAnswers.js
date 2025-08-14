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

  const clearAnswers = useCallback(() => {
    actions.clearAnswers();
  }, [actions]);

  const resetToDefaultDefinitions = useCallback(() => {
    actions.resetToDefaultDefinitions();
  }, [actions]);

  const isUsingCustomDefinitions = useCallback(() => {
    return actions.isUsingCustomDefinitions();
  }, [actions]);

  return {
    answers: state.answers,
    updateAnswer,
    importAnswers,
    clearAnswers,
    resetToDefaultDefinitions,
    isUsingCustomDefinitions,
  };
}
