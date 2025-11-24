export interface Match {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  opponent: string;
  venue: string;
  homeScore?: number;
  awayScore?: number;
}

export type ViewMode = 'calendar' | 'list';
