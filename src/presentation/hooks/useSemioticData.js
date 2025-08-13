import { useApp } from './useApp';

export function useSemioticData() {
  const { state } = useApp();

  return {
    loading: state.loading,
    semioticLadderGrouping: state.semioticLadderGrouping,
  };
}
