import React from 'react';
import { X, Calendar, Clock, MapPin, Shield } from 'lucide-react';
import { TeamLogo } from './TeamLogo';
import { Match } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface MatchDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    date: Date | null;
    matches: Match[];
}

export const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ isOpen, onClose, date, matches }) => {
    if (!isOpen || !date) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">

                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-middle bg-dark-800 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:max-w-md sm:w-full border border-dark-700 w-full">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <div className="bg-dark-700 p-2 rounded-xl">
                                    <Calendar className="w-5 h-5 text-brand-teal" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white capitalize leading-none">
                                        {format(date, 'EEEE d', { locale: es })}
                                    </h3>
                                    <p className="text-xs text-slate-400 capitalize">
                                        {format(date, 'MMMM yyyy', { locale: es })}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-dark-700 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {matches.length > 0 ? (
                                matches.map((match) => (
                                    <div key={match.id} className="bg-dark-900/50 rounded-2xl p-4 border border-white/5">
                                        {/* Header */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-dark-800 px-2 py-1 rounded-lg border border-white/5">
                                                <Clock className="w-3.5 h-3.5 text-brand-teal" />
                                                {match.time}
                                            </div>
                                            {match.homeScore !== undefined && match.awayScore !== undefined ? (
                                                <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-300 uppercase">
                                                    Finalizado
                                                </div>
                                            ) : (
                                                <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-teal/10 text-brand-teal border border-brand-teal/20 uppercase">
                                                    Programado
                                                </div>
                                            )}
                                        </div>

                                        {/* Teams */}
                                        <div className="flex items-center justify-between mb-4">
                                            {/* Home */}
                                            <div className="flex flex-col items-center gap-2 w-1/3">
                                                <TeamLogo team={match.homeTeam} className="w-12 h-12" />
                                                <span className={`text-xs font-bold text-center leading-tight ${match.homeTeam === 'CLAVER 2007' ? 'text-brand-teal' : 'text-white'}`}>
                                                    {match.homeTeam}
                                                </span>
                                            </div>

                                            {/* Score / VS */}
                                            <div className="flex flex-col items-center justify-center w-1/3">
                                                {match.homeScore !== undefined && match.awayScore !== undefined ? (
                                                    <div className="flex flex-col items-center gap-1">
                                                        <div className="text-2xl font-black text-white tracking-widest">
                                                            {match.homeScore} - {match.awayScore}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-xl font-black text-slate-700 italic">VS</span>
                                                )}
                                            </div>

                                            {/* Away */}
                                            <div className="flex flex-col items-center gap-2 w-1/3">
                                                <TeamLogo team={match.awayTeam} className="w-12 h-12" />
                                                <span className={`text-xs font-bold text-center leading-tight break-words w-full ${match.awayTeam === 'CLAVER 2007' ? 'text-brand-teal' : 'text-white'}`}>
                                                    {match.awayTeam}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Venue */}
                                        <div className="flex items-center gap-2 text-xs text-slate-400 border-t border-white/5 pt-3">
                                            <MapPin className="w-3.5 h-3.5 text-brand-green" />
                                            <span className="font-medium">{match.venue}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-slate-500">
                                    <p>No hay partidos programados para este día.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
