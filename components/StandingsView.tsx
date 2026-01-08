import React, { useMemo } from 'react';
import { Match } from '../types';

interface StandingsViewProps {
    matches: Match[];
}

interface TeamStats {
    name: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
}

export const StandingsView: React.FC<StandingsViewProps> = ({ matches }) => {
    const standings = useMemo(() => {
        const stats: Record<string, TeamStats> = {};

        // Initialize stats for all teams found in matches
        matches.forEach(match => {
            if (!stats[match.homeTeam]) {
                stats[match.homeTeam] = {
                    name: match.homeTeam,
                    played: 0,
                    won: 0,
                    drawn: 0,
                    lost: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    points: 0
                };
            }
            if (!stats[match.awayTeam]) {
                stats[match.awayTeam] = {
                    name: match.awayTeam,
                    played: 0,
                    won: 0,
                    drawn: 0,
                    lost: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    points: 0
                };
            }
        });

        // Calculate stats
        matches.forEach(match => {
            if (typeof match.homeScore === 'number' && typeof match.awayScore === 'number') {
                const home = stats[match.homeTeam];
                const away = stats[match.awayTeam];

                home.played++;
                away.played++;

                home.goalsFor += match.homeScore;
                home.goalsAgainst += match.awayScore;
                away.goalsFor += match.awayScore;
                away.goalsAgainst += match.homeScore;

                if (match.homeScore > match.awayScore) {
                    home.won++;
                    home.points += 3;
                    away.lost++;
                } else if (match.homeScore < match.awayScore) {
                    away.won++;
                    away.points += 3;
                    home.lost++;
                } else {
                    home.drawn++;
                    home.points += 1;
                    away.drawn++;
                    away.points += 1;
                }
            }
        });

        // BONIFICACION INAUGURACION
        if (stats['CLAVER 2007']) {
            stats['CLAVER 2007'].points += 1;
        }

        return Object.values(stats)
            .filter(team => team.name !== 'POR DEFINIR')
            .sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                const gdA = a.goalsFor - a.goalsAgainst;
                const gdB = b.goalsFor - b.goalsAgainst;
                if (gdB !== gdA) return gdB - gdA;
                return b.goalsFor - a.goalsFor;
            });
    }, [matches]);

    return (
        <div className="space-y-4">
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-400 uppercase bg-white/5">
                            <tr>
                                <th className="px-4 py-3 font-medium text-center w-12">Pos</th>
                                <th className="px-4 py-3 font-medium">Equipo</th>
                                <th className="px-4 py-3 font-medium text-center">G/E/P</th>
                                <th className="px-4 py-3 font-medium text-center">Goles</th>
                                <th className="px-4 py-3 font-medium text-center">Pts</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {standings.map((team, index) => {
                                let rowClass = "hover:bg-white/5 transition-colors border-l-2 border-transparent";
                                if (index < 2) {
                                    rowClass = "bg-brand-teal/10 hover:bg-brand-teal/20 transition-colors border-l-2 border-brand-teal";
                                } else if (index < 6) {
                                    rowClass = "bg-blue-500/10 hover:bg-blue-500/20 transition-colors border-l-2 border-blue-500";
                                }

                                return (
                                    <tr key={team.name} className={rowClass}>
                                        <td className="px-4 py-3 text-center font-medium text-slate-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="font-medium text-white">{team.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <span className="text-slate-300 text-sm">
                                                    {team.won}/{team.drawn}/{team.lost}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="text-slate-300">{team.goalsFor}:{team.goalsAgainst}</span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="font-bold text-brand-teal text-base">{team.points}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
