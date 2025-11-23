import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, List, Plus, Trophy } from 'lucide-react';
import { Match, ViewMode } from './types';
import { CalendarView } from './components/CalendarView';
import { ListView } from './components/ListView';
import { AddMatchModal } from './components/AddMatchModal';

// Mock initial data
const INITIAL_MATCHES: Match[] = [
  { id: '1', date: '2025-11-25', time: '22:15', opponent: 'BERCHMANS 2008', venue: 'CANCHA 1' },
  { id: '2', date: '2025-12-02', time: '23:10', opponent: 'KOTSKA 2010', venue: 'CANCHA 2' },
  { id: '3', date: '2025-12-12', time: '22:30', opponent: 'BORJA 2012', venue: 'CANCHA 1' },
  { id: '4', date: '2025-12-16', time: '21:50', opponent: 'ARRUPE 2005', venue: 'CANCHA 2' },
  { id: '5', date: '2025-12-22', time: '21:00', opponent: 'LOYOLA 2003', venue: 'CANCHA 1' },
  { id: '6', date: '2025-12-26', time: '21:45', opponent: 'HURTADO 2009', venue: 'CANCHA 1' },
  { id: '7', date: '2025-12-29', time: '22:40', opponent: 'XAVIER 2011', venue: 'CANCHA 2' },
  { id: '8', date: '2026-01-07', time: '22:15', opponent: 'XAVIER 2004', venue: 'CANCHA 2' },
  { id: '9', date: '2026-01-12', time: '23:00', opponent: 'GONZAGA 2006', venue: 'CANCHA 2' },
  { id: '10', date: '2026-01-16', time: 'POR DEFINIR', opponent: 'CUARTOS', venue: 'POR DEFINIR' },
  { id: '11', date: '2026-01-19', time: 'POR DEFINIR', opponent: 'SEMIFINAL', venue: 'POR DEFINIR' },
  { id: '12', date: '2026-01-23', time: 'POR DEFINIR', opponent: 'FINAL', venue: 'POR DEFINIR' },
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('list');
  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem('my_team_fixtures');
    // Si no hay datos guardados, usamos los iniciales actualizados.
    // NOTA: Si ya abriste la app antes, borrar el localStorage o usar una ventana incognito para ver los nuevos datos.
    return saved ? JSON.parse(saved) : INITIAL_MATCHES;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('my_team_fixtures', JSON.stringify(matches));
  }, [matches]);

  const handleAddMatch = (newMatchData: Omit<Match, 'id'>) => {
    const newMatch: Match = {
      ...newMatchData,
      id: crypto.randomUUID(),
    };
    setMatches([...matches, newMatch]);
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col font-sans selection:bg-brand-teal selection:text-dark-900">
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 right-0 h-96 bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none transform -translate-y-1/2"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-20 items-center">
            
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-brand-teal to-brand-green p-0.5 rounded-xl">
                 <div className="bg-dark-900 p-2 rounded-[10px]">
                   <Trophy className="h-5 w-5 text-brand-teal" />
                 </div>
              </div>
              <div className="leading-none">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  CLAVER <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-green">2007</span>
                </h1>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-1">
                  Camp. ASIA 2025 - 2026
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-dark-800 hover:bg-dark-700 text-brand-teal border border-brand-teal/20 p-2.5 rounded-xl transition-all active:scale-95"
              aria-label="Agregar Partido"
            >
              <Plus className="w-5 h-5" />
            </button>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-6 z-10">
        
        {/* Navigation Switcher */}
        <div className="bg-dark-800 p-1 rounded-2xl mb-8 flex border border-dark-700">
          <button
            onClick={() => setView('list')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              view === 'list' 
                ? 'bg-dark-700 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <List className="w-4 h-4" />
            Lista
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              view === 'calendar' 
                ? 'bg-dark-700 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            Calendario
          </button>
        </div>

        {view === 'calendar' ? (
          <CalendarView matches={matches} />
        ) : (
          <ListView matches={matches} />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-8">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600 font-medium">
            CLAVER 2007 • Developed for Champions
          </p>
        </div>
      </footer>

      {/* Modal */}
      <AddMatchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddMatch={handleAddMatch} 
      />
    </div>
  );
};

export default App;