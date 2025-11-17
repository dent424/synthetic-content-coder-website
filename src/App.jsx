import { useState } from 'react';
import Header from './components/Layout/Header';
import LandingSection from './components/Landing/LandingSection';
import OverviewSection from './components/Overview/OverviewSection';
import GettingStartedSection from './components/GettingStarted/GettingStartedSection';
import TutorialSection from './components/Tutorial/TutorialSection';
import GeneratorSection from './components/Generator/GeneratorSection';
import ResourcesSection from './components/Resources/ResourcesSection';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'home' && <LandingSection setActiveTab={setActiveTab} />}
        {activeTab === 'overview' && <OverviewSection />}
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
