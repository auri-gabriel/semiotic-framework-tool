import React, { useEffect, useState } from 'react';
import { useExport } from '../hooks/useExport';
import ExportOverlay from './ExportOverlay';
import Navbar from './Navbar';
import {
  HeroSection,
  StartSection,
  AboutUsSection,
  WorksSection,
  ReferencesSection,
  FeedbackSection,
  FooterSection,
} from '../sections';

const MainLayout = () => {
  const { exporting } = useExport();
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTopButton(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='min-vh-100 d-flex flex-column'>
      <ExportOverlay isExporting={exporting} />
      <Navbar />
      <main className='flex-grow-1'>
        <HeroSection />
        <StartSection />
        <AboutUsSection />
        <WorksSection />
        <ReferencesSection />
        <FeedbackSection />
      </main>
      <FooterSection />
      {showBackToTopButton ? (
        <button
          type='button'
          className='back-to-top-button btn btn-primary'
          onClick={handleBackToTop}
          aria-label='Voltar ao topo'
          title='Voltar ao topo'
        >
          <i className='bi bi-arrow-up' aria-hidden='true' />
        </button>
      ) : null}
    </div>
  );
};

export default MainLayout;
