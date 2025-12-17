import { Match } from './types';

export const TEAMS = [
    'CLAVER 2007',
    'BERCHMANS 2008',
    'KOTSKA 2010',
    'BORJA 2012',
    'ARRUPE 2005',
    'LOYOLA 2003',
    'HURTADO 2009',
    'XAVIER 2011',
    'XAVIER 2004',
    'GONZAGA 2006'
];

export const ALL_MATCHES: Match[] = [
    // FECHA 1
    { id: '1', date: '2025-11-25', time: '20:00', opponent: 'LOYOLA 2003', homeTeam: 'BORJA 2012', awayTeam: 'LOYOLA 2003', venue: 'CANCHA 2', homeScore: 2, awayScore: 1, round: 'FECHA 1' },
    { id: '2', date: '2025-11-25', time: '20:45', opponent: 'XAVIER 2004', homeTeam: 'XAVIER 2011', awayTeam: 'XAVIER 2004', venue: 'CANCHA 2', homeScore: 1, awayScore: 1, round: 'FECHA 1' },
    { id: '3', date: '2025-11-25', time: '21:30', opponent: 'ARRUPE 2005', homeTeam: 'KOTSKA 2010', awayTeam: 'ARRUPE 2005', venue: 'CANCHA 2', homeScore: 2, awayScore: 3, round: 'FECHA 1' },
    { id: '4', date: '2025-11-25', time: '22:15', opponent: 'GONZAGA 2006', homeTeam: 'HURTADO 2009', awayTeam: 'GONZAGA 2006', venue: 'CANCHA 2', homeScore: 2, awayScore: 0, round: 'FECHA 1' },
    { id: '5', date: '2025-11-25', time: '22:15', opponent: 'BERCHMANS 2008', homeTeam: 'BERCHMANS 2008', awayTeam: 'CLAVER 2007', venue: 'CANCHA 1', homeScore: 3, awayScore: 2, round: 'FECHA 1' },

    // FECHA 2
    { id: '6', date: '2025-12-01', time: '22:40', opponent: 'BERCHMANS 2008', homeTeam: 'HURTADO 2009', awayTeam: 'BERCHMANS 2008', venue: 'CANCHA 1', homeScore: 1, awayScore: 1, round: 'FECHA 2' },
    { id: '7', date: '2025-12-02', time: '21:00', opponent: 'LOYOLA 2003', homeTeam: 'XAVIER 2004', awayTeam: 'LOYOLA 2003', venue: 'CANCHA 2', homeScore: 3, awayScore: 1, round: 'FECHA 2' },
    { id: '8', date: '2025-12-02', time: '21:50', opponent: 'BORJA 2012', homeTeam: 'ARRUPE 2005', awayTeam: 'BORJA 2012', venue: 'CANCHA 2', homeScore: 7, awayScore: 1, round: 'FECHA 2' },
    { id: '9', date: '2025-12-02', time: '22:40', opponent: 'XAVIER 2011', homeTeam: 'GONZAGA 2006', awayTeam: 'XAVIER 2011', venue: 'CANCHA 2', homeScore: 3, awayScore: 2, round: 'FECHA 2' },
    { id: '10', date: '2025-12-02', time: '23:10', opponent: 'KOTSKA 2010', homeTeam: 'KOTSKA 2010', awayTeam: 'CLAVER 2007', venue: 'CANCHA 2', homeScore: 6, awayScore: 2, round: 'FECHA 2' },

    // FECHA 3
    { id: '11', date: '2025-12-12', time: '20:00', opponent: 'LOYOLA 2003', homeTeam: 'ARRUPE 2005', awayTeam: 'LOYOLA 2003', venue: 'CANCHA 1', homeScore: 5, awayScore: 1, round: 'FECHA 3' },
    { id: '12', date: '2025-12-12', time: '20:45', opponent: 'GONZAGA 2006', homeTeam: 'XAVIER 2004', awayTeam: 'GONZAGA 2006', venue: 'CANCHA 1', homeScore: 4, awayScore: 3, round: 'FECHA 3' },
    { id: '13', date: '2025-12-12', time: '21:30', opponent: 'BORJA 2012', homeTeam: 'BORJA 2012', awayTeam: 'CLAVER 2007', venue: 'CANCHA 1', homeScore: 1, awayScore: 3, round: 'FECHA 3' },
    { id: '14', date: '2025-12-12', time: '22:15', opponent: 'BERCHMANS 2008', homeTeam: 'XAVIER 2011', awayTeam: 'BERCHMANS 2008', venue: 'CANCHA 1', homeScore: 3, awayScore: 3, round: 'FECHA 3' },
    { id: '15', date: '2025-12-12', time: '22:45', opponent: 'HURTADO 2009', homeTeam: 'KOTSKA 2010', awayTeam: 'HURTADO 2009', venue: 'CANCHA 1', homeScore: 1, awayScore: 3, round: 'FECHA 3' },

    // FECHA 4
    { id: '16', date: '2025-12-15', time: '21:40', opponent: 'KOTSKA 2010', homeTeam: 'XAVIER 2011', awayTeam: 'KOTSKA 2010', venue: 'CANCHA 2', homeScore: 2, awayScore: 1, round: 'FECHA 4' },
    { id: '17', date: '2025-12-16', time: '20:00', opponent: 'LOYOLA 2003', homeTeam: 'GONZAGA 2006', awayTeam: 'LOYOLA 2003', venue: 'CANCHA 2', homeScore: 2, awayScore: 1, round: 'FECHA 4' },
    { id: '18', date: '2025-12-16', time: '20:50', opponent: 'ARRUPE 2005', homeTeam: 'ARRUPE 2005', awayTeam: 'CLAVER 2007', venue: 'CANCHA 2', homeScore: 2, awayScore: 1, round: 'FECHA 4' },
    { id: '19', date: '2025-12-16', time: '21:40', opponent: 'HURTADO 2009', homeTeam: 'BORJA 2012', awayTeam: 'HURTADO 2009', venue: 'CANCHA 2', homeScore: 5, awayScore: 8, round: 'FECHA 4' },
    { id: '20', date: '2025-12-16', time: '22:10', opponent: 'BERCHMANS 2008', homeTeam: 'XAVIER 2004', awayTeam: 'BERCHMANS 2008', venue: 'CANCHA 2', homeScore: 4, awayScore: 2, round: 'FECHA 4' },

    // FECHA 5
    { id: '21', date: '2025-11-22', time: '20:00', opponent: 'LOYOLA 2003', homeTeam: 'CLAVER 2007', awayTeam: 'LOYOLA 2003', venue: 'CANCHA 1', homeScore: 6, awayScore: 3, round: 'FECHA 5' },
    { id: '22', date: '2025-12-22', time: '20:50', opponent: 'BERCHMANS 2008', homeTeam: 'GONZAGA 2006', awayTeam: 'BERCHMANS 2008', venue: 'CANCHA 1', round: 'FECHA 5' },
    { id: '23', date: '2025-12-22', time: '21:40', opponent: 'HURTADO 2009', homeTeam: 'ARRUPE 2005', awayTeam: 'HURTADO 2009', venue: 'CANCHA 1', round: 'FECHA 5' },
    { id: '24', date: '2025-12-22', time: '22:10', opponent: 'KOTSKA 2010', homeTeam: 'XAVIER 2004', awayTeam: 'KOTSKA 2010', venue: 'CANCHA 1', round: 'FECHA 5' },
    { id: '25', date: '2025-12-22', time: '22:55', opponent: 'XAVIER 2011', homeTeam: 'BORJA 2012', awayTeam: 'XAVIER 2011', venue: 'CANCHA 1', round: 'FECHA 5' },

    // FECHA 6
    { id: '26', date: '2025-12-26', time: '20:00', opponent: 'LOYOLA 2003', homeTeam: 'BERCHMANS 2008', awayTeam: 'LOYOLA 2003', venue: 'CANCHA 1', round: 'FECHA 6' },
    { id: '27', date: '2025-12-26', time: '20:45', opponent: 'HURTADO 2009', homeTeam: 'CLAVER 2007', awayTeam: 'HURTADO 2009', venue: 'CANCHA 1', round: 'FECHA 6' },
    { id: '28', date: '2025-12-26', time: '21:30', opponent: 'KOTSKA 2010', homeTeam: 'GONZAGA 2006', awayTeam: 'KOTSKA 2010', venue: 'CANCHA 1', round: 'FECHA 6' },
    { id: '29', date: '2025-12-26', time: '22:15', opponent: 'XAVIER 2011', homeTeam: 'ARRUPE 2005', awayTeam: 'XAVIER 2011', venue: 'CANCHA 1', round: 'FECHA 6' },
    { id: '30', date: '2025-12-26', time: '22:45', opponent: 'BORJA 2012', homeTeam: 'XAVIER 2004', awayTeam: 'BORJA 2012', venue: 'CANCHA 1', round: 'FECHA 6' },

    // FECHA 7
    { id: '31', date: '2025-12-29', time: '20:00', opponent: 'LOYOLA 2003', homeTeam: 'HURTADO 2009', awayTeam: 'LOYOLA 2003', venue: 'CANCHA 2', round: 'FECHA 7' },
    { id: '32', date: '2025-12-29', time: '20:50', opponent: 'KOTSKA 2010', homeTeam: 'BERCHMANS 2008', awayTeam: 'KOTSKA 2010', venue: 'CANCHA 2', round: 'FECHA 7' },
    { id: '33', date: '2025-12-29', time: '21:40', opponent: 'XAVIER 2011', homeTeam: 'CLAVER 2007', awayTeam: 'XAVIER 2011', venue: 'CANCHA 2', round: 'FECHA 7' },
    { id: '34', date: '2025-12-29', time: '22:10', opponent: 'ARRUPE 2005', homeTeam: 'XAVIER 2004', awayTeam: 'ARRUPE 2005', venue: 'CANCHA 2', round: 'FECHA 7' },
    { id: '35', date: '2025-12-29', time: '22:10', opponent: 'BORJA 2012', homeTeam: 'GONZAGA 2006', awayTeam: 'BORJA 2012', venue: 'CANCHA 1', round: 'FECHA 7' },

    // FECHA 8
    { id: '36', date: '2026-01-07', time: '19:00', opponent: 'LOYOLA 2003', homeTeam: 'KOTSKA 2010', awayTeam: 'LOYOLA 2003', venue: 'CANCHA 2', round: 'FECHA 8' },
    { id: '37', date: '2026-01-07', time: '19:45', opponent: 'ARRUPE 2005', homeTeam: 'GONZAGA 2006', awayTeam: 'ARRUPE 2005', venue: 'CANCHA 2', round: 'FECHA 8' },
    { id: '38', date: '2026-01-07', time: '20:30', opponent: 'BORJA 2012', homeTeam: 'BERCHMANS 2008', awayTeam: 'BORJA 2012', venue: 'CANCHA 2', round: 'FECHA 8' },
    { id: '39', date: '2026-01-07', time: '21:15', opponent: 'XAVIER 2004', homeTeam: 'CLAVER 2007', awayTeam: 'XAVIER 2004', venue: 'CANCHA 2', round: 'FECHA 8' },
    { id: '40', date: '2026-01-07', time: '21:15', opponent: 'XAVIER 2011', homeTeam: 'HURTADO 2009', awayTeam: 'XAVIER 2011', venue: 'CANCHA 1', round: 'FECHA 8' },

    // FECHA 9
    { id: '41', date: '2026-01-12', time: '19:00', opponent: 'LOYOLA 2003', homeTeam: 'XAVIER 2011', awayTeam: 'LOYOLA 2003', venue: 'CANCHA 2', round: 'FECHA 9' },
    { id: '42', date: '2026-01-12', time: '19:45', opponent: 'BORJA 2012', homeTeam: 'KOTSKA 2010', awayTeam: 'BORJA 2012', venue: 'CANCHA 2', round: 'FECHA 9' },
    { id: '43', date: '2026-01-12', time: '20:30', opponent: 'XAVIER 2004', homeTeam: 'HURTADO 2009', awayTeam: 'XAVIER 2004', venue: 'CANCHA 2', round: 'FECHA 9' },
    { id: '44', date: '2026-01-12', time: '21:15', opponent: 'ARRUPE 2005', homeTeam: 'BERCHMANS 2008', awayTeam: 'ARRUPE 2005', venue: 'CANCHA 2', round: 'FECHA 9' },
    { id: '45', date: '2026-01-12', time: '22:00', opponent: 'GONZAGA 2006', homeTeam: 'CLAVER 2007', awayTeam: 'GONZAGA 2006', venue: 'CANCHA 2', round: 'FECHA 9' },

    // FINAL STAGES
    { id: '200', date: '2026-01-16', time: 'POR DEFINIR', opponent: 'CUARTOS', homeTeam: 'POR DEFINIR', awayTeam: 'POR DEFINIR', venue: 'POR DEFINIR', round: 'CUARTOS DE FINAL' },
    { id: '201', date: '2026-01-16', time: 'POR DEFINIR', opponent: 'CUARTOS', homeTeam: 'POR DEFINIR', awayTeam: 'POR DEFINIR', venue: 'POR DEFINIR', round: 'CUARTOS DE FINAL' },
    { id: '202', date: '2026-01-19', time: 'POR DEFINIR', opponent: 'SEMIFINAL', homeTeam: 'POR DEFINIR', awayTeam: 'POR DEFINIR', venue: 'POR DEFINIR', round: 'SEMIFINAL' },
    { id: '203', date: '2026-01-19', time: 'POR DEFINIR', opponent: 'SEMIFINAL', homeTeam: 'POR DEFINIR', awayTeam: 'POR DEFINIR', venue: 'POR DEFINIR', round: 'SEMIFINAL' },
    { id: '204', date: '2026-01-23', time: 'POR DEFINIR', opponent: 'FINAL', homeTeam: 'POR DEFINIR', awayTeam: 'POR DEFINIR', venue: 'POR DEFINIR', round: 'FINAL' },
];

export const INITIAL_MATCHES: Match[] = ALL_MATCHES.filter(m => m.homeTeam === 'CLAVER 2007' || m.awayTeam === 'CLAVER 2007');
