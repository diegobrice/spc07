import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, Shield } from 'lucide-react';
import { Button } from './Button';
import { Match } from '../types';

interface AddMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMatch: (match: Omit<Match, 'id'>) => void;
}

export const AddMatchModal: React.FC<AddMatchModalProps> = ({ isOpen, onClose, onAddMatch }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    opponent: '',
    venue: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.opponent || !formData.venue) {
      alert('Por favor completa todos los campos');
      return;
    }
    onAddMatch(formData);
    setFormData({ date: '', time: '', opponent: '', venue: '' });
    onClose();
  };

  const inputClass = "w-full bg-dark-900 text-white border border-dark-700 rounded-xl px-4 py-2.5 pl-10 focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-all placeholder-slate-600 text-sm";
  const iconClass = "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Background overlay */}
        <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-middle bg-dark-800 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:max-w-md sm:w-full border border-dark-700">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-teal" />
                Agregar Partido
              </h3>
              <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-dark-700 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Fecha</label>
                <div className="relative">
                  <div className={iconClass}>
                    <Calendar className="h-4 w-4" />
                  </div>
                  <input
                    type="date"
                    min="2025-11-01"
                    max="2026-02-28"
                    className={inputClass}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Hora</label>
                <div className="relative">
                  <div className={iconClass}>
                    <Clock className="h-4 w-4" />
                  </div>
                  <input
                    type="time"
                    className={inputClass}
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Equipo Rival</label>
                <div className="relative">
                  <div className={iconClass}>
                    <Users className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Ej. Los Tigres"
                    value={formData.opponent}
                    onChange={(e) => setFormData({...formData, opponent: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Cancha / Lugar</label>
                <div className="relative">
                  <div className={iconClass}>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Ej. Complejo Deportivo Norte"
                    value={formData.venue}
                    onChange={(e) => setFormData({...formData, venue: e.target.value})}
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button type="button" variant="secondary" fullWidth onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" fullWidth>
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};