import React, { useState } from 'react';
import { Calendar as CalendarIcon, List, Trophy, LayoutGrid } from 'lucide-react';
import { Match, ViewMode } from './types';
import { CalendarView } from './components/CalendarView';
import { ListView } from './components/ListView';
import { FixtureView } from './components/FixtureView';
import { INITIAL_MATCHES, ALL_MATCHES } from './data';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('fixture');
  const [myMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [allMatches] = useState<Match[]>(ALL_MATCHES);

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col font-sans selection:bg-brand-teal selection:text-dark-900">

      {/* Background Decor */}
      <div className="fixed top-0 left-0 right-0 h-96 bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none transform -translate-y-1/2"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-20 items-center">

            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-brand-teal to-brand-green p-0.5 rounded-xl">
                <div className="bg-dark-900 p-2 rounded-[10px]">
                  <Trophy className="h-5 w-5 text-brand-teal" />
                </div>
              </div>
              <div className="leading-none">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  CLAVER 2007
                </h1>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-1">
                  Campeonato ASIA 2025 - 2026
                </p>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto w-full px-4 py-6 z-10">

        {/* Navigation Switcher */}
        <div className="bg-dark-800 p-1 rounded-2xl mb-8 flex border border-dark-700 overflow-x-auto">
          <button
            onClick={() => setView('fixture')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${view === 'fixture'
              ? 'bg-dark-700 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-300'
              }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Fixture
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${view === 'list'
              ? 'bg-dark-700 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-300'
              }`}
          >
            <List className="w-4 h-4" />
            Mis partidos
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${view === 'calendar'
              ? 'bg-dark-700 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-300'
              }`}
          >
            <CalendarIcon className="w-4 h-4" />
            Calendario
          </button>
        </div>

        {view === 'calendar' ? (
          <CalendarView matches={[
            ...myMatches,
            ...allMatches.filter(m => ['CUARTOS DE FINAL', 'SEMIFINAL', 'FINAL'].includes(m.round || ''))
              .filter((match, index, self) =>
                index === self.findIndex((t) => t.date === match.date)
              )
          ]} />
        ) : view === 'fixture' ? (
          <FixtureView matches={allMatches} />
        ) : (
          <ListView matches={myMatches} />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-8">
        <div className="max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600 font-medium">
            CLAVER 2007 • Developed for Champions
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;