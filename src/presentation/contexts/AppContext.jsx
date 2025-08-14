import React, { createContext, useReducer, useEffect } from 'react';
import { getQuestionsGroupedBySemiotics } from '../../business/SemioticLadderManager';
import {
  XmlService,
  SemioticLadderService,
  EngineeringLayersService,
} from '../../data/services';

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_SEMIOTIC_LADDER_GROUPING: 'SET_SEMIOTIC_LADDER_GROUPING',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_ANSWERS: 'SET_ANSWERS',
  UPDATE_ANSWER: 'UPDATE_ANSWER',
  SET_EXPORT_ONLY_ANSWERED: 'SET_EXPORT_ONLY_ANSWERED',
  SET_EXPORT_ENG_ONLY_ANSWERED: 'SET_EXPORT_ENG_ONLY_ANSWERED',
  SET_EXPORTING: 'SET_EXPORTING',
  IMPORT_ANSWERS: 'IMPORT_ANSWERS',
};

// Initial state
const initialState = {
  loading: true,
  semioticLadderGrouping: {},
  language: (() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'en';
  })(),
  answers: (() => {
    const saved = localStorage.getItem('answers');
    return saved ? JSON.parse(saved) : {};
  })(),
  exportOnlyAnswered: false,
  exportEngOnlyAnswered: false,
  exporting: false,
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case ActionTypes.SET_SEMIOTIC_LADDER_GROUPING:
      return { ...state, semioticLadderGrouping: action.payload };

    case ActionTypes.SET_LANGUAGE:
      return { ...state, language: action.payload };

    case ActionTypes.SET_ANSWERS:
      return { ...state, answers: action.payload };

    case ActionTypes.UPDATE_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.value,
        },
      };

    case ActionTypes.SET_EXPORT_ONLY_ANSWERED:
      return { ...state, exportOnlyAnswered: action.payload };

    case ActionTypes.SET_EXPORT_ENG_ONLY_ANSWERED:
      return { ...state, exportEngOnlyAnswered: action.payload };

    case ActionTypes.SET_EXPORTING:
      return { ...state, exporting: action.payload };

    case ActionTypes.IMPORT_ANSWERS:
      return { ...state, answers: action.payload };

    default:
      return state;
  }
}

// Context
export const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Effect for language persistence
  useEffect(() => {
    localStorage.setItem('language', state.language);
  }, [state.language]);

  // Effect for answers persistence
  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(state.answers));
  }, [state.answers]);

  // Effect for initial data loading
  useEffect(() => {
    async function fetchData() {
      try {
        const semioticLadderGroupingData =
          await getQuestionsGroupedBySemiotics();
        dispatch({
          type: ActionTypes.SET_SEMIOTIC_LADDER_GROUPING,
          payload: semioticLadderGroupingData,
        });
      } catch (error) {
        console.error('Error loading semiotic ladder data:', error);
      } finally {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    }
    fetchData();
  }, []);

  // Action creators
  const actions = {
    setLoading: (loading) =>
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),

    setLanguage: (language) =>
      dispatch({ type: ActionTypes.SET_LANGUAGE, payload: language }),

    updateAnswer: (questionId, value) =>
      dispatch({
        type: ActionTypes.UPDATE_ANSWER,
        payload: { questionId, value },
      }),

    setExportOnlyAnswered: (value) =>
      dispatch({ type: ActionTypes.SET_EXPORT_ONLY_ANSWERED, payload: value }),

    setExportEngOnlyAnswered: (value) =>
      dispatch({
        type: ActionTypes.SET_EXPORT_ENG_ONLY_ANSWERED,
        payload: value,
      }),

    setExporting: (exporting) =>
      dispatch({ type: ActionTypes.SET_EXPORTING, payload: exporting }),

    importAnswers: (answers) =>
      dispatch({ type: ActionTypes.IMPORT_ANSWERS, payload: answers }),

    handleExport: async (format, options = {}) => {
      actions.setExporting(true);

      try {
        let exportObj;
        if (format === 'xml') {
          exportObj = XmlService.exportAnswersAsXML(state.answers);
          if (exportObj) {
            const blob = new Blob([exportObj.data], {
              type: exportObj.mimeType,
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = exportObj.fileName;
            a.click();
            URL.revokeObjectURL(url);
          }
        }

        if (format === 'semiotic-ladder') {
          await SemioticLadderService.exportDocument({
            grouping: state.semioticLadderGrouping,
            answers: state.answers,
            onlyAnswered: options.onlyAnswered,
            language: state.language,
            format: options.format,
          });
        }

        if (format === 'engineering-layers') {
          await EngineeringLayersService.exportDocument({
            questions: Object.values(state.semioticLadderGrouping)
              .flatMap((group) => Object.values(group.steps))
              .flatMap((step) => step.questions),
            answers: state.answers,
            onlyAnswered: options.onlyAnswered,
            language: state.language,
            format: options.format,
          });
        }
      } catch (error) {
        console.error('Export error:', error);
      } finally {
        actions.setExporting(false);
      }
    },

    handleImportXML: (xmlString) => {
      try {
        const imported = XmlService.importAnswersFromXML(xmlString);
        actions.importAnswers(imported);
      } catch (error) {
        console.error('Import error:', error);
        alert('Failed to import XML.');
      }
    },
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

export { ActionTypes };
