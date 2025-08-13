import { useCallback } from 'react';
import { useApp } from './useApp';

export function useExport() {
  const { state, actions } = useApp();

  const handleExport = useCallback(
    (format, options = {}) => {
      actions.handleExport(format, options);
    },
    [actions]
  );

  const setExportOnlyAnswered = useCallback(
    (value) => {
      actions.setExportOnlyAnswered(value);
    },
    [actions]
  );

  const setExportEngOnlyAnswered = useCallback(
    (value) => {
      actions.setExportEngOnlyAnswered(value);
    },
    [actions]
  );

  return {
    exportOnlyAnswered: state.exportOnlyAnswered,
    exportEngOnlyAnswered: state.exportEngOnlyAnswered,
    exporting: state.exporting,
    handleExport,
    setExportOnlyAnswered,
    setExportEngOnlyAnswered,
  };
}
