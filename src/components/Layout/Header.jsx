import { BookOpen, Code2, Library, Home } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Home },
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
              Interactive Supplement: Synthetic Content Coders
            </h1>
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
                    focus:outline-none focus:ring-2 focus:ring-slate-400
                    ${isActive
                      ? 'bg-slate-300 text-slate-700 shadow-md font-bold active:bg-slate-400'
                      : 'bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 active:bg-slate-300 active:font-bold'
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
