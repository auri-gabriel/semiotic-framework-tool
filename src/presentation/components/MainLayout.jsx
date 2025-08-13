import React from 'react';
import { useExport } from '../hooks/useExport';
import { ExportOverlay } from './ExportOverlay';
import Navbar from './Navbar';
import Hero from './Hero';
import StartSection from './StartSection';
import AboutUs from './AboutUs';
import Works from './Works';
import Footer from './Footer';

export function MainLayout() {
  const { exporting } = useExport();

  return (
    <div className='min-vh-100 d-flex flex-column'>
      <ExportOverlay isExporting={exporting} />
      <Navbar />
      <main className='flex-grow-1'>
        <Hero />
        <StartSection />
        <AboutUs />
        <Works />
      </main>
      <Footer />
    </div>
  );
}
