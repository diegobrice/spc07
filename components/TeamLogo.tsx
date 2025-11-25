import React from 'react';
import { Shield } from 'lucide-react';

interface TeamLogoProps {
    team: string;
    className?: string;
}

export const TeamLogo: React.FC<TeamLogoProps> = ({ team, className = "w-10 h-10" }) => {
    if (team === 'CLAVER 2007') {
        return (
            <div className={`${className} rounded-lg bg-dark-900 flex items-center justify-center border border-white/5 overflow-hidden`}>
                <img src="/images/spclogo.png" alt="Claver 2007" className="w-full h-full object-cover" />
            </div>
        );
    }

    // Extract year from team name (assuming format "NAME YEAR")
    const yearMatch = team.match(/\d{4}$/);
    const year = yearMatch ? yearMatch[0] : '';

    if (year) {
        return (
            <div className={`${className} rounded-lg bg-dark-800 flex flex-col items-center justify-center border border-white/10 shadow-inner`}>
                <span className="text-[10px] font-black leading-none text-slate-400">{year.substring(0, 2)}</span>
                <span className="text-[10px] font-black leading-none text-slate-400">{year.substring(2, 4)}</span>
            </div>
        );
    }

    // Fallback if no year found
    return (
        <div className={`${className} rounded-lg bg-dark-800 flex items-center justify-center border border-white/10`}>
            <Shield className="w-1/2 h-1/2 text-slate-600" />
        </div>
    );
};
