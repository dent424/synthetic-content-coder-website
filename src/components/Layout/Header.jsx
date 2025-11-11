import { BookOpen, Code2, Library } from 'lucide-react';

const tabs = [
  { id: 'tutorial', label: 'Tutorial', icon: BookOpen },
  { id: 'generator', label: 'Code Generator', icon: Code2 },
  { id: 'resources', label: 'Resources', icon: Library },
];

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Synthetic Psychometric Coders
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Interactive Supplement for &quot;From Human to Synthetic Coders&quot;
            </p>
          </div>

          {/* Tabs */}
          <nav className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary/30
                    ${isActive
                      ? 'bg-primary text-white shadow-md font-bold active:bg-primary/80 active:text-white'
                      : 'bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 active:bg-slate-300 active:text-slate-700 active:font-semibold'
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
