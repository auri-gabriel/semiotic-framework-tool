import React from 'react';
import { useExport } from '../hooks/useExport';
import { ExportOverlay } from './ExportOverlay';
import Navbar from './Navbar';
import StartSection from './StartSection';
import FooterSection from './FooterSection';
import HeroSection from './HeroSection';
import AboutUsSection from './AboutUsSection';
import WorksSection from './WorksSection';

export function MainLayout() {
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
