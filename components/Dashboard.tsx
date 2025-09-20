import React, { useMemo } from 'react';
import { View } from '../types';
import { DAILY_TIPS } from '../constants';
import { GymIcon, BookIcon, ZenIcon, ProgressIcon, BellIcon } from './Icons';

interface DashboardProps {
    setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
    const tipOfTheDay = useMemo(() => DAILY_TIPS[new Date().getDate() % DAILY_TIPS.length], []);

    const QuickAccessButton: React.FC<{
        title: string;
        view: View;
        icon: React.ReactNode;
        className: string;
    }> = ({ title, view, icon, className }) => (
        <button
            onClick={() => setView(view)}
            className={`flex items-center justify-center text-center p-6 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 w-full ${className}`}
        >
            <div className="mr-4">{icon}</div>
            <span className="text-lg font-semibold">{title}</span>
        </button>
    );

    return (
        <div className="p-6 space-y-8">
            <header className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-blue-700">Un día a la vez.</h1>
                    <p className="text-lg text-blue-600 mt-1">La constancia te acerca a tu meta.</p>
                </div>
                <button 
                    onClick={() => setView('REMINDERS')} 
                    className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label="Configurar recordatorios"
                >
                    <BellIcon className="w-6 h-6 text-blue-500" />
                </button>
            </header>

            <section>
                <button
                    onClick={() => setView('EXERCISES')}
                    className="w-full bg-blue-500 text-white p-6 rounded-2xl shadow-lg hover:bg-blue-600 transition-colors duration-300 text-left"
                >
                    <h2 className="text-2xl font-bold">Mi Rutina de Hoy</h2>
                    <p className="mt-1">Empecemos con tus ejercicios faciales.</p>
                </button>
            </section>

            <section className="grid grid-cols-2 gap-4">
                <QuickAccessButton title="Librería" view="EXERCISES" icon={<GymIcon className="w-8 h-8"/>} className="bg-white text-blue-600"/>
                <QuickAccessButton title="Enciclopedia" view="ENCYCLOPEDIA" icon={<BookIcon className="w-8 h-8"/>} className="bg-white text-cyan-600"/>
                <QuickAccessButton title="Espacio Zen" view="ZEN" icon={<ZenIcon className="w-8 h-8"/>} className="bg-white text-indigo-500"/>
                <QuickAccessButton title="Mi Progreso" view="PROGRESS" icon={<ProgressIcon className="w-8 h-8"/>} className="bg-white text-teal-500"/>
            </section>

            <section className="bg-slate-100 p-5 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 text-lg">Tip del Día</h3>
                <p className="text-slate-700 mt-2">{tipOfTheDay}</p>
            </section>
        </div>
    );
};

export default Dashboard;