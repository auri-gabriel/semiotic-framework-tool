/*
 * Copyright (c) 2025 GEInfoEdu
 * SPDX-License-Identifier: GPL-3.0-only
 * Author: Auri Gabriel Castro de Melo
 */

import { useApp } from './useApp';

export function useSemioticData() {
  const { state } = useApp();

  return {
    loading: state.loading,
    semioticLadderGrouping: state.semioticLadderGrouping,
  };
}
