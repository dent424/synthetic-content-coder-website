import { BookOpen, Code2, Library, Home, Rocket, Compass } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'overview', label: 'Validation', icon: Compass },
  { id: 'getting-started', label: 'Getting Started', icon: Rocket },
  { id: 'tutorial', label: 'Tutorial', icon: BookOpen },
  { id: 'generator', label: 'Code Generator', icon: Code2 },
  { id: 'resources', label: 'Resources', icon: Library },
];

// Color mapping for each tab with subtle tints
const tabColors = {
  'home': {
    bg: 'bg-slate-100',
    text: 'text-slate-900',
    border: 'border-slate-500'
  },
  'overview': {
    bg: 'bg-slate-100',
    text: 'text-slate-900',
    border: 'border-slate-500'
  },
  'getting-started': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-900',
    border: 'border-emerald-500'
  },
  'tutorial': {
    bg: 'bg-violet-50',
    text: 'text-violet-900',
    border: 'border-violet-500'
  },
  'generator': {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    border: 'border-amber-500'
  },
  'resources': {
    bg: 'bg-sky-50',
    text: 'text-sky-900',
    border: 'border-sky-500'
  }
};

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Interactive Supplement: Synthetic Content Coders
            </h1>
          </div>

          {/* Tabs */}
          <nav className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const colors = tabColors[tab.id];

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg
                    transition-all duration-200 border-b-2
                    focus:outline-none focus:ring-2 focus:ring-slate-400
                    ${isActive
                      ? `${colors.bg} ${colors.text} ${colors.border} shadow-md font-bold`
                      : 'bg-white text-slate-600 border-transparent font-medium hover:bg-slate-50 active:font-bold'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
