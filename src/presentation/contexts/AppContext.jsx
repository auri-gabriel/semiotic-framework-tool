import React, { createContext, useReducer, useEffect } from 'react';
import { getQuestionsGroupedBySemiotics } from '../../business/SemioticLadderManager';
import {
  XmlService,
  SemioticLadderService,
  EngineeringLayersService,
} from '../../data/services';
import { XmlReaderService } from '../../data/services/XmlReaderService';

const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_SEMIOTIC_LADDER_GROUPING: 'SET_SEMIOTIC_LADDER_GROUPING',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_ANSWERS: 'SET_ANSWERS',
  UPDATE_ANSWER: 'UPDATE_ANSWER',
  SET_EXPORT_WITHOUT_OVERVIEW: 'SET_EXPORT_WITHOUT_OVERVIEW',
  SET_EXPORT_ENG_WITHOUT_OVERVIEW: 'SET_EXPORT_ENG_WITHOUT_OVERVIEW',
  SET_EXPORT_ONLY_ANSWERED: 'SET_EXPORT_ONLY_ANSWERED',
  SET_EXPORT_ENG_ONLY_ANSWERED: 'SET_EXPORT_ENG_ONLY_ANSWERED',
  SET_EXPORTING: 'SET_EXPORTING',
  IMPORT_ANSWERS: 'IMPORT_ANSWERS',
  SET_PROJECT_METADATA: 'SET_PROJECT_METADATA',
  CLEAR_PROJECT_METADATA: 'CLEAR_PROJECT_METADATA',
  CLEAR_ANSWERS: 'CLEAR_ANSWERS',
  REFRESH_SEMIOTIC_DATA: 'REFRESH_SEMIOTIC_DATA',
};

const initialState = {
  loading: true,
  semioticLadderGrouping: {},
  language: (() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'pt_BR';
  })(),
  answers: (() => {
    const saved = localStorage.getItem('answers');
    return saved ? JSON.parse(saved) : {};
  })(),
  projectMetadata: (() => {
    const saved = localStorage.getItem('projectMetadata');
    if (!saved) {
      return { title: '', focalProblem: '', authorship: '' };
    }

    try {
      const parsed = JSON.parse(saved);
      return {
        title: parsed?.title || '',
        focalProblem: parsed?.focalProblem || '',
        authorship: parsed?.authorship || '',
      };
    } catch {
      return { title: '', focalProblem: '', authorship: '' };
    }
  })(),
  exportOnlyAnswered: false,
  exportEngOnlyAnswered: false,
  exportWithoutOverview: false,
  exportEngWithoutOverview: false,
  exporting: false,
};

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

    case ActionTypes.SET_EXPORT_WITHOUT_OVERVIEW:
      return { ...state, exportWithoutOverview: action.payload };

    case ActionTypes.SET_EXPORT_ENG_WITHOUT_OVERVIEW:
      return { ...state, exportEngWithoutOverview: action.payload };

    case ActionTypes.SET_EXPORTING:
      return { ...state, exporting: action.payload };

    case ActionTypes.IMPORT_ANSWERS:
      return { ...state, answers: action.payload };

    case ActionTypes.SET_PROJECT_METADATA:
      return {
        ...state,
        projectMetadata: {
          ...state.projectMetadata,
          ...action.payload,
        },
      };

    case ActionTypes.CLEAR_PROJECT_METADATA:
      return {
        ...state,
        projectMetadata: { title: '', focalProblem: '', authorship: '' },
      };

    case ActionTypes.CLEAR_ANSWERS:
      return { ...state, answers: {} };

    case ActionTypes.REFRESH_SEMIOTIC_DATA:
      return { ...state, loading: true };

    default:
      return state;
  }
}

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    localStorage.setItem('language', state.language);
  }, [state.language]);

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(state.answers));
  }, [state.answers]);

  useEffect(() => {
    localStorage.setItem(
      'projectMetadata',
      JSON.stringify(state.projectMetadata),
    );
  }, [state.projectMetadata]);

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

    setExportWithoutOverview: (value) =>
      dispatch({
        type: ActionTypes.SET_EXPORT_WITHOUT_OVERVIEW,
        payload: value,
      }),

    setExportEngWithoutOverview: (value) =>
      dispatch({
        type: ActionTypes.SET_EXPORT_ENG_WITHOUT_OVERVIEW,
        payload: value,
      }),

    setExporting: (exporting) =>
      dispatch({ type: ActionTypes.SET_EXPORTING, payload: exporting }),

    importAnswers: (answers) =>
      dispatch({ type: ActionTypes.IMPORT_ANSWERS, payload: answers }),

    setProjectMetadata: (metadata) =>
      dispatch({ type: ActionTypes.SET_PROJECT_METADATA, payload: metadata }),

    clearProjectMetadata: () =>
      dispatch({ type: ActionTypes.CLEAR_PROJECT_METADATA }),

    handleExport: async (format, options = {}) => {
      actions.setExporting(true);

      try {
        let exportObj;
        if (format === 'xml') {
          exportObj = await XmlService.exportAnswersAsXML(
            state.answers,
            state.projectMetadata,
          );
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
            withoutOverview: state.exportWithoutOverview,
            language: state.language,
            projectMetadata: state.projectMetadata,
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
            withoutOverview: state.exportEngWithoutOverview,
            language: state.language,
            projectMetadata: state.projectMetadata,
            format: options.format,
          });
        }
      } catch (error) {
        console.error('Export error:', error);
      } finally {
        actions.setExporting(false);
      }
    },

    handleImportXML: async (xmlString) => {
      try {
        const imported = XmlService.importFromXML(xmlString);

        if (imported.definitions) {
          XmlReaderService.setCustomDefinitions(imported.definitions);

          dispatch({ type: ActionTypes.REFRESH_SEMIOTIC_DATA });

          try {
            const semioticLadderGroupingData =
              await getQuestionsGroupedBySemiotics();
            dispatch({
              type: ActionTypes.SET_SEMIOTIC_LADDER_GROUPING,
              payload: semioticLadderGroupingData,
            });
          } catch (error) {
            console.error(
              'Error loading semiotic ladder data with new definitions:',
              error,
            );
          } finally {
            dispatch({ type: ActionTypes.SET_LOADING, payload: false });
          }
        }

        actions.importAnswers(imported.answers);
        actions.setProjectMetadata(imported.projectMetadata);
      } catch (error) {
        console.error('Import error:', error);
        alert('Failed to import XML.');
      }
    },

    resetToDefaultDefinitions: async () => {
      try {
        XmlReaderService.resetToDefaultDefinitions();

        dispatch({ type: ActionTypes.REFRESH_SEMIOTIC_DATA });

        try {
          const semioticLadderGroupingData =
            await getQuestionsGroupedBySemiotics();
          dispatch({
            type: ActionTypes.SET_SEMIOTIC_LADDER_GROUPING,
            payload: semioticLadderGroupingData,
          });
        } catch (error) {
          console.error(
            'Error loading semiotic ladder data with default definitions:',
            error,
          );
        } finally {
          dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Error resetting to default definitions:', error);
      }
    },

    clearAnswers: () => {
      dispatch({ type: ActionTypes.CLEAR_ANSWERS });
    },

    isUsingCustomDefinitions: () => {
      return XmlReaderService.getCustomDefinitions() !== null;
    },
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

export { ActionTypes };
