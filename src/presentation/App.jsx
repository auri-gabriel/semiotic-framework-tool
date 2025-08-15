import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { AppProvider } from './contexts/AppContext';
import MainLayout from './components/MainLayout';
import { useSemioticData } from './hooks/useSemioticData';
import './i18n'; // Initialize i18next
import { useTranslation } from 'react-i18next';

function SimpleLoadingSpinner() {
  const { t } = useTranslation();

  return (
    <div className='d-flex flex-column align-items-center justify-content-center py-5'>
      <div className='spinner-border text-primary mb-3' role='status'>
        <span className='visually-hidden'>{t('loading.loading')}</span>
      </div>
      <div className='fw-semibold text-secondary'>{t('loading.loading')}</div>
    </div>
  );
}

function AppContent() {
  const { loading } = useSemioticData();

  return loading ? <SimpleLoadingSpinner /> : <MainLayout />;
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
