import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { MainLayout } from './components/MainLayout';
import { useSemioticData } from './hooks/useSemioticData';
import { useApp } from './hooks/useApp';

// Simple loading component that doesn't require language context
function SimpleLoadingSpinner() {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center py-5'>
      <div className='spinner-border text-primary mb-3' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
      <div className='fw-semibold text-secondary'>Loading...</div>
    </div>
  );
}

function AppContent() {
  const { loading } = useSemioticData();
  const { state, actions } = useApp();

  return (
    <LanguageProvider
      language={state.language}
      setLanguage={actions.setLanguage}
    >
      {loading ? <SimpleLoadingSpinner /> : <MainLayout />}
    </LanguageProvider>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
