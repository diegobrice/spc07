import React, { useState, useMemo } from 'react';
import { Match } from '../types';
import { StandingsView } from './StandingsView';
import { TeamLogo } from './TeamLogo';
import { ALL_MATCHES } from '../data';

interface SimulationViewProps {
    matches: Match[]; // actually we might ignore this prop and just use ALL_MATCHES from data, but for consistency let's keep it or just use imports
}

export const SimulationView: React.FC = () => {
    // 1. Get Fecha 9 matches
    const fecha9Matches = useMemo(() => {
        return ALL_MATCHES.filter(m => m.round === 'FECHA 9');
    }, []);

    // 2. State for simulated scores
    const [simulatedScores, setSimulatedScores] = useState<Record<string, { home: number | string, away: number | string }>>({});

    // 3. Handle score change
    const handleScoreChange = (matchId: string, team: 'home' | 'away', value: string) => {
        setSimulatedScores(prev => ({
            ...prev,
            [matchId]: {
                ...prev[matchId],
                [team]: value === '' ? '' : parseInt(value) || 0
            }
        }));
    };

    // 4. Merge matches for standings
    const mergedMatches = useMemo(() => {
        // All matches EXCEPT Fecha 9 (to avoid duplication if we just appended)
        // Actually, let's take ALL_MATCHES and map over them. 
        // If it's a Fecha 9 match, we use the simulated scores.

        return ALL_MATCHES.map(match => {
            if (match.round === 'FECHA 9') {
                const sim = simulatedScores[match.id];
                if (sim && sim.home !== '' && sim.away !== '') {
                    return {
                        ...match,
                        homeScore: Number(sim.home),
                        awayScore: Number(sim.away)
                    };
                }
            }
            return match;
        });
    }, [simulatedScores]);


    return (
        <div className="space-y-8">
            {/* Matches Input Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white px-2">Simular FECHA 9</h2>
                <div className="grid gap-2 sm:gap-3">
                    {fecha9Matches.map(match => {
                        const score = simulatedScores[match.id] || { home: '', away: '' };
                        return (
                            <div key={match.id} className="bg-dark-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/5 flex items-center justify-between gap-2 sm:gap-4 text-xs sm:text-base">
                                {/* Home Team */}
                                <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3 min-w-0">
                                    <span className="font-medium text-slate-300 text-right truncate hidden sm:block">{match.homeTeam}</span>
                                    <span className="font-bold text-white sm:hidden truncate">{match.homeTeam.split(' ')[0]}</span>
                                    <TeamLogo team={match.homeTeam} className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                                </div>

                                {/* Score Inputs */}
                                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-8 h-8 sm:w-12 sm:h-10 bg-dark-900 border border-white/10 rounded-md sm:rounded-lg text-center text-white font-bold focus:outline-none focus:border-brand-teal transition-colors text-sm sm:text-base appearance-none m-0"
                                        value={score.home}
                                        onChange={(e) => handleScoreChange(match.id, 'home', e.target.value)}
                                    />
                                    <span className="text-slate-500 font-bold">-</span>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-8 h-8 sm:w-12 sm:h-10 bg-dark-900 border border-white/10 rounded-md sm:rounded-lg text-center text-white font-bold focus:outline-none focus:border-brand-teal transition-colors text-sm sm:text-base appearance-none m-0"
                                        value={score.away}
                                        onChange={(e) => handleScoreChange(match.id, 'away', e.target.value)}
                                    />
                                </div>

                                {/* Away Team */}
                                <div className="flex-1 flex items-center justify-start gap-2 sm:gap-3 min-w-0">
                                    <TeamLogo team={match.awayTeam} className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                                    <span className="font-medium text-slate-300 text-left truncate hidden sm:block">{match.awayTeam}</span>
                                    <span className="font-bold text-white sm:hidden truncate">{match.awayTeam.split(' ')[0]}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Standings Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white px-2">Tabla Simulada</h2>
                <StandingsView matches={mergedMatches} />
            </div>
        </div>
    );
};
