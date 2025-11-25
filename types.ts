export interface Match {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  opponent: string; // Keep for backward compatibility or display logic if needed, but prefer home/away
  homeTeam: string;
  awayTeam: string;
  venue: string;
  round?: string; // e.g., "FECHA 1", "CUARTOS", "SEMIFINAL"
  homeScore?: number;
  awayScore?: number;
}

export type ViewMode = 'calendar' | 'list' | 'fixture';
