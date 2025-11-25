import { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import LandingSection from './components/Landing/LandingSection';
import OverviewSection from './components/Overview/OverviewSection';
import GettingStartedSection from './components/GettingStarted/GettingStartedSection';
import TutorialSection from './components/Tutorial/TutorialSection';
import GeneratorSection from './components/Generator/GeneratorSection';
import ResourcesSection from './components/Resources/ResourcesSection';

// Valid tab names
const VALID_TABS = ['home', 'getting-started', 'overview', 'tutorial', 'generator', 'resources'];

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Sync activeTab with URL hash
  useEffect(() => {
    // Read hash on mount
    const hash = window.location.hash.slice(1); // Remove '#' prefix
    if (hash && VALID_TABS.includes(hash)) {
      setActiveTab(hash);
    }

    // Listen for hash changes (browser back/forward)
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1) || 'home';
      if (VALID_TABS.includes(newHash)) {
        setActiveTab(newHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Wrapper to update both state and hash
  const handleTabChange = (newTab) => {
    if (VALID_TABS.includes(newTab)) {
      window.location.hash = newTab;
      // State will be updated by hashchange event
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header activeTab={activeTab} setActiveTab={handleTabChange} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'home' && <LandingSection setActiveTab={handleTabChange} />}
        {activeTab === 'overview' && <OverviewSection setActiveTab={handleTabChange} />}
        {activeTab === 'getting-started' && <GettingStartedSection />}
        {activeTab === 'tutorial' && <TutorialSection />}
        {activeTab === 'generator' && <GeneratorSection />}
        {activeTab === 'resources' && <ResourcesSection />}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-slate-600">
          <p>
            Interactive supplement for academic research on LLM-based content coding.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Built with React + Vite + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
