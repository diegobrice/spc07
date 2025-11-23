import React, { useState } from 'react';
import { Match } from '../types';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  addMonths, 
  subMonths,
  isToday 
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

interface CalendarViewProps {
  matches: Match[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ matches }) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    const startOfChampionship = new Date(2025, 10, 1); // Nov 2025
    return now < startOfChampionship ? startOfChampionship : now;
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); 
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="pb-4 animate-in fade-in duration-500">
      <div className="bg-dark-800 rounded-3xl overflow-hidden border border-dark-700 shadow-xl shadow-black/20">
        
        {/* Calendar Header */}
        <div className="bg-dark-800 p-6 flex items-center justify-between border-b border-dark-700">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-dark-700 text-slate-300 hover:text-white transition-colors border border-transparent hover:border-dark-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h3 className="text-white font-bold text-xl capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </h3>
          
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-dark-700 text-slate-300 hover:text-white transition-colors border border-transparent hover:border-dark-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Week Days */}
        <div className="grid grid-cols-7 border-b border-dark-700 bg-dark-900/30">
          {daysOfWeek.map(day => (
            <div key={day} className="py-3 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 bg-dark-800">
          {days.map((day, i) => {
            const dateString = format(day, 'yyyy-MM-dd');
            const dayMatches = matches.filter(m => m.date === dateString);
            const hasMatch = dayMatches.length > 0;
            const isDayToday = isToday(day);
            const isCurrentMonth = isSameMonth(day, monthStart);

            let bgClass = "bg-transparent";
            if (!isCurrentMonth) bgClass = "bg-dark-900/40 text-slate-600";
            else if (hasMatch) bgClass = "bg-brand-teal/5 shadow-inner shadow-brand-teal/5";

            // Today highlight logic
            const dayNumberBaseClass = "flex items-center justify-center w-6 h-6 text-[10px] sm:text-xs font-semibold rounded-full transition-transform";
            const dayNumberClass = isDayToday 
              ? `${dayNumberBaseClass} bg-gradient-to-r from-brand-teal to-brand-green text-dark-900 shadow-lg shadow-brand-teal/20 scale-110` 
              : hasMatch 
                ? `${dayNumberBaseClass} text-brand-teal font-bold` 
                : `${dayNumberBaseClass} text-slate-300`;

            return (
              <div 
                key={day.toString()} 
                className={`relative min-h-[6rem] sm:min-h-[8rem] border-b border-r border-dark-700/50 p-1 flex flex-col transition-all ${bgClass}`}
              >
                {/* Date Number */}
                <div className="flex justify-end sm:justify-end mb-1">
                  <span className={dayNumberClass}>
                    {format(day, 'd')}
                  </span>
                </div>
                
                {/* Match Info */}
                <div className="flex-1 flex flex-col gap-1 w-full">
                  {dayMatches.map(match => (
                    <div 
                      key={match.id} 
                      className="bg-dark-900/90 border border-brand-teal/30 rounded-lg p-1.5 sm:p-2 shadow-lg shadow-black/10 hover:border-brand-teal transition-colors group cursor-default"
                    >
                      <p className="text-[9px] sm:text-[10px] font-bold text-brand-teal truncate leading-tight mb-0.5 uppercase tracking-wide">
                        {match.opponent}
                      </p>
                      <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-400 group-hover:text-slate-300">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-green/70" />
                        <span>{match.time}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1 text-[8px] text-slate-500 mt-1 truncate">
                        <MapPin className="w-2.5 h-2.5" />
                        {match.venue}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};