import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ClientPortal from './components/ClientPortal';
import SubnetExplorer from './components/SubnetExplorer';

type Page = 'landing' | 'portal' | 'explorer';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'portal' && <ClientPortal onNavigate={handleNavigate} />}
      {currentPage === 'explorer' && <SubnetExplorer onNavigate={handleNavigate} />}
    </div>
  );
}
