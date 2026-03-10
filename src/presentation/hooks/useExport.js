/*
 * Copyright (c) 2025 GEInfoEdu
 * SPDX-License-Identifier: GPL-3.0-only
 * Author: Auri Gabriel Castro de Melo
 */

import { useCallback } from 'react';
import { useApp } from './useApp';

export function useExport() {
  const { state, actions } = useApp();

  const handleExport = useCallback(
    (format, options = {}) => {
      actions.handleExport(format, options);
    },
    [actions],
  );

  const setExportOnlyAnswered = useCallback(
    (value) => {
      actions.setExportOnlyAnswered(value);
    },
    [actions],
  );
  const setExportWithoutOverview = useCallback(
    (value) => {
      actions.setExportWithoutOverview(value);
    },
    [actions],
  );

  const setExportIncludeDescriptions = useCallback(
    (value) => {
      actions.setExportIncludeDescriptions(value);
    },
    [actions],
  );

  const setExportEngOnlyAnswered = useCallback(
    (value) => {
      actions.setExportEngOnlyAnswered(value);
    },
    [actions],
  );

  const setExportEngWithoutOverview = useCallback(
    (value) => {
      actions.setExportEngWithoutOverview(value);
    },
    [actions],
  );

  const setExportEngIncludeDescriptions = useCallback(
    (value) => {
      actions.setExportEngIncludeDescriptions(value);
    },
    [actions],
  );

  return {
    exportOnlyAnswered: state.exportOnlyAnswered,
    exportEngOnlyAnswered: state.exportEngOnlyAnswered,
    exportWithoutOverview: state.exportWithoutOverview,
    exportEngWithoutOverview: state.exportEngWithoutOverview,
    exportIncludeDescriptions: state.exportIncludeDescriptions,
    exportEngIncludeDescriptions: state.exportEngIncludeDescriptions,
    exporting: state.exporting,
    handleExport,
    setExportOnlyAnswered,
    setExportEngOnlyAnswered,
    setExportWithoutOverview,
    setExportEngWithoutOverview,
    setExportIncludeDescriptions,
    setExportEngIncludeDescriptions,
  };
}
