import React, { useState, useEffect } from 'react';
import { Match } from '../types';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { Trophy, Clock, MapPin, Shield } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface FixtureViewProps {
    matches: Match[];
}

export const FixtureView: React.FC<FixtureViewProps> = ({ matches }) => {
    // Group matches by round (e.g., "FECHA 1")
    const matchesByRound = React.useMemo(() => {
        const grouped: { [key: string]: Match[] } = {};
        matches.forEach(match => {
            const round = match.round || match.date; // Fallback to date if round is missing
            if (!grouped[round]) {
                grouped[round] = [];
            }
            grouped[round].push(match);
        });
        return grouped;
    }, [matches]);

    // Sort rounds: FECHA 1...9, then CUARTOS, SEMIFINAL, FINAL
    const rounds = Object.keys(matchesByRound).sort((a, b) => {
        const getOrder = (r: string) => {
            if (r.startsWith('FECHA')) return parseInt(r.split(' ')[1]);
            if (r === 'CUARTOS DE FINAL') return 100;
            if (r === 'SEMIFINAL') return 101;
            if (r === 'FINAL') return 102;
            return 999;
        };
        return getOrder(a) - getOrder(b);
    });

    // Initialize with the first round that has unplayed matches (no score)
    const [selectedRound, setSelectedRound] = useState<string>(() => {
        if (rounds.length === 0) return '';

        // Find the first round that has at least one match without a score
        const nextRound = rounds.find(round => {
            const roundMatches = matchesByRound[round];
            return roundMatches.some(m => m.homeScore === undefined || m.awayScore === undefined);
        });

        // If all rounds are played, default to the last one (or the first one if preferred, but usually last played is better context)
        // If a next round is found, use it.
        return nextRound || rounds[rounds.length - 1];
    });

    const currentMatches = matchesByRound[selectedRound] || [];

    if (rounds.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-dark-800/50 rounded-3xl border border-dashed border-dark-700">
                <div className="bg-dark-700 p-4 rounded-full mb-4">
                    <Trophy className="h-8 w-8 text-brand-teal" />
                </div>
                <h3 className="text-lg font-semibold text-white">Sin partidos</h3>
                <p className="text-slate-400 text-sm mt-1">No hay partidos programados.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Round Carousel */}
            <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                <div className="flex gap-3 min-w-max">
                    {rounds.map((round) => {
                        const isSelected = selectedRound === round;

                        return (
                            <button
                                key={round}
                                onClick={() => setSelectedRound(round)}
                                className={`relative flex flex-col items-center justify-center px-6 h-12 rounded-xl transition-all duration-300 border ${isSelected
                                    ? 'bg-dark-700 border-brand-teal/30 shadow-sm'
                                    : 'bg-dark-800/30 border-white/5 hover:bg-dark-800 hover:border-white/10'
                                    }`}
                            >
                                <span className={`text-sm font-black tracking-widest uppercase ${isSelected ? 'text-brand-teal' : 'text-slate-500'}`}>
                                    {round}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Matches List */}
            <div className="space-y-6">
                {Object.entries(
                    [...currentMatches].reduce((acc, match) => {
                        if (!acc[match.date]) acc[match.date] = [];
                        acc[match.date].push(match);
                        return acc;
                    }, {} as { [key: string]: Match[] })
                )
                    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                    .map(([date, matches]) => {
                        const dateObj = parse(date, 'yyyy-MM-dd', new Date());
                        return (
                            <div key={date} className="space-y-2">
                                {/* Date Subtitle */}
                                <div className="flex items-center gap-2 px-1">
                                    <div className="h-px flex-1 bg-white/10"></div>
                                    <span className="text-xs font-bold text-brand-teal uppercase tracking-widest">
                                        {format(dateObj, 'EEE d MMM', { locale: es }).replace('.', '')}
                                    </span>
                                    <div className="h-px flex-1 bg-white/10"></div>
                                </div>

                                {/* Cards for this date */}
                                {matches
                                    .sort((a, b) => {
                                        const timeA = a.time.includes(':') ? a.time : '00:00';
                                        const timeB = b.time.includes(':') ? b.time : '00:00';
                                        return timeA.localeCompare(timeB);
                                    })
                                    .map((match) => (
                                        <MatchCard key={match.id} match={match} />
                                    ))
                                }
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

const MatchCard: React.FC<{ match: Match }> = ({ match }) => {
    const isMyMatch = match.homeTeam === 'CLAVER 2007' || match.awayTeam === 'CLAVER 2007';

    return (
        <div className={`relative group overflow-hidden rounded-xl border transition-all duration-300 shadow-md ${isMyMatch
            ? 'bg-dark-800 border-brand-teal shadow-[0_0_15px_rgba(45,212,191,0.15)]'
            : 'bg-dark-800 border-dark-700 hover:border-dark-600'
            }`}>
            {/* Background Gradient Effect */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-brand-teal/5 rounded-full blur-xl group-hover:bg-brand-teal/10 transition-all duration-500"></div>

            <div className="relative p-2 sm:p-3">
                {/* Main Match Content */}
                <div className="flex items-center justify-between">
                    {/* Home Team */}
                    <div className="flex-1 flex items-center gap-2 overflow-hidden">
                        <TeamLogo team={match.homeTeam} className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
                        <div className="flex flex-col items-start leading-none overflow-hidden">
                            <span className={`font-bold text-xs sm:text-sm truncate w-full ${match.homeTeam === 'CLAVER 2007' ? 'text-brand-teal' : 'text-white'}`}>
                                {match.homeTeam.replace(/\s\d{4}$/, '')}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500">
                                {match.homeTeam.match(/\d{4}$/)?.[0] || ''}
                            </span>
                        </div>
                    </div>

                    {/* VS / Time / Score */}
                    <div className="px-2 flex flex-col items-center min-w-[60px]">
                        {match.homeScore !== undefined && match.awayScore !== undefined ? (
                            <div className="text-lg sm:text-xl font-black text-white tracking-widest leading-none">
                                {match.homeScore}-{match.awayScore}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-0.5">
                                <span className="text-[10px] font-black text-slate-600 italic">VS</span>
                                <div className="text-[10px] font-medium text-slate-400 bg-dark-900/50 px-1.5 py-0.5 rounded border border-white/5 whitespace-nowrap">
                                    {match.time}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Away Team */}
                    <div className="flex-1 flex items-center gap-2 justify-end overflow-hidden text-right">
                        <div className="flex flex-col items-end leading-none overflow-hidden">
                            <span className={`font-bold text-xs sm:text-sm truncate w-full ${match.awayTeam === 'CLAVER 2007' ? 'text-brand-teal' : 'text-white'}`}>
                                {match.awayTeam.replace(/\s\d{4}$/, '')}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500">
                                {match.awayTeam.match(/\d{4}$/)?.[0] || ''}
                            </span>
                        </div>
                        <TeamLogo team={match.awayTeam} className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
                    </div>
                </div>

                {/* Footer: Venue */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 border-t border-white/5 pt-2 mt-2">
                    <MapPin className="w-3 h-3 text-brand-green" />
                    <span className="font-medium tracking-wide">{match.venue}</span>
                </div>
            </div>
        </div>
    );
};
