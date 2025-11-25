import React from 'react';
import { Match } from '../types';
import { format, parse, differenceInCalendarDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, MapPin, Trophy, Shield } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface ListViewProps {
  matches: Match[];
}

export const ListView: React.FC<ListViewProps> = ({ matches }) => {
  // Sort matches by date
  const sortedMatches = [...matches].sort((a, b) => {
    // If time contains a colon, it's likely a valid time. Otherwise (e.g. "POR DEFINIR"), treat as end of day or 00:00.
    // We use a dummy time '00:00' for invalid strings to ensure they don't produce NaN.
    const timeA = a.time.includes(':') ? a.time : '00:00';
    const timeB = b.time.includes(':') ? b.time : '00:00';
    return new Date(a.date + 'T' + timeA).getTime() - new Date(b.date + 'T' + timeB).getTime();
  });

  if (sortedMatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-dark-800/50 rounded-3xl border border-dashed border-dark-700">
        <div className="bg-dark-700 p-4 rounded-full mb-4">
          <Trophy className="h-8 w-8 text-brand-teal" />
        </div>
        <h3 className="text-lg font-semibold text-white">Sin partidos</h3>
        <p className="text-slate-400 text-sm mt-1">Tu calendario está vacío por ahora.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedMatches.map((match) => {
        // Parse date YYYY-MM-DD
        const dateObj = parse(match.date, 'yyyy-MM-dd', new Date());
        const daysRemaining = differenceInCalendarDays(dateObj, new Date());

        let daysText = '';
        let badgeClass = '';

        if (daysRemaining < 0) {
          daysText = 'Finalizado';
          badgeClass = 'text-slate-500 bg-slate-500/10 border-slate-500/20';
        } else if (daysRemaining === 0) {
          daysText = '¡JUEGA HOY!';
          badgeClass = 'text-brand-teal bg-brand-teal/10 border-brand-teal/30 animate-pulse';
        } else if (daysRemaining === 1) {
          daysText = 'MAÑANA';
          badgeClass = 'text-brand-green bg-brand-green/10 border-brand-green/30';
        } else {
          daysText = `Faltan ${daysRemaining} días`;
          badgeClass = 'text-brand-teal bg-brand-teal/10 border-brand-teal/20';
        }

        return (
          <div key={match.id} className="relative group overflow-hidden bg-dark-800 rounded-3xl border border-dark-700 hover:border-dark-600 transition-all duration-300 shadow-lg shadow-black/20">
            {/* Background Gradient Effect */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-teal/5 rounded-full blur-3xl group-hover:bg-brand-teal/10 transition-all duration-500"></div>

            <div className="relative p-5">
              {/* Header: Date & Status */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{format(dateObj, 'EEE d MMM', { locale: es })}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${badgeClass}`}>
                  {daysText}
                </span>
              </div>

              {/* Main Match Content */}
              <div className="flex items-center justify-between mb-3">
                {/* Home Team */}
                <div className="flex-1 flex flex-col items-start">
                  <TeamLogo team={match.homeTeam} className="w-12 h-12 mb-2" />
                  <span className={`font-bold text-lg leading-tight ${match.homeTeam === 'CLAVER 2007' ? 'text-brand-teal' : 'text-white'}`}>
                    {match.homeTeam}
                  </span>
                </div>

                {/* VS / Time / Score */}
                <div className="px-4 flex flex-col items-center">
                  {match.homeScore !== undefined && match.awayScore !== undefined ? (
                    <div className="flex flex-col items-center gap-1">
                      <div className="text-3xl font-black text-white tracking-widest">
                        {match.homeScore} - {match.awayScore}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-black text-slate-700 italic">VS</div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-dark-900/50 px-2.5 py-1 rounded-lg border border-white/5">
                        <Clock className="w-3 h-3 text-brand-teal" />
                        {match.time}
                      </div>
                    </>
                  )}
                </div>

                {/* Away Team */}
                <div className="flex-1 flex flex-col items-end text-right">
                  <TeamLogo team={match.awayTeam} className="w-12 h-12 mb-2" />
                  <span className={`font-bold text-lg leading-tight break-words w-full ${match.awayTeam === 'CLAVER 2007' ? 'text-brand-teal' : 'text-white'}`}>
                    {match.awayTeam}
                  </span>
                </div>
              </div>

              {/* Footer: Venue */}
              <div className="flex items-center gap-2 text-xs text-slate-400 border-t border-white/5 pt-3">
                <MapPin className="w-3.5 h-3.5 text-brand-green" />
                <span className="font-medium tracking-wide">{match.venue}</span>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};