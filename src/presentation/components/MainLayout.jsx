import React from 'react';
import { useExport } from '../hooks/useExport';
import ExportOverlay from './ExportOverlay.jsx';
import Navbar from './Navbar';
import {
  HeroSection,
  StartSection,
  AboutUsSection,
  WorksSection,
  FooterSection,
} from '../sections';

function MainLayout() {
  const { exporting } = useExport();

  return (
    <div className='min-vh-100 d-flex flex-column'>
      <ExportOverlay isExporting={exporting} />
      <Navbar />
      <main className='flex-grow-1'>
        <HeroSection />
        <StartSection />
        <AboutUsSection />
        <WorksSection />
      </main>
      <FooterSection />
    </div>
  );
}

export default MainLayout;
