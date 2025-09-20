import React, { useState, useEffect } from 'react';
// Fix: Removed import of ZenActivity from constants.ts as it is not exported from there and not used in this file.
import { ZEN_ACTIVITIES } from '../constants';
import { ZenMode } from '../types';

const BreathingExercise: React.FC = () => {
    const [phase, setPhase] = useState('Inhala');
    const [isBreathing, setIsBreathing] = useState(false);

    useEffect(() => {
        if (!isBreathing) return;

        const cycle = ['Inhala', 'Sostén', 'Exhala', 'Sostén'];
        let currentPhaseIndex = 0;

        const interval = setInterval(() => {
            currentPhaseIndex = (currentPhaseIndex + 1) % cycle.length;
            setPhase(cycle[currentPhaseIndex]);
        }, 4000); // 4 seconds per phase

        return () => clearInterval(interval);
    }, [isBreathing]);

    const circleClass = isBreathing
        ? phase === 'Inhala' ? 'scale-110' : phase === 'Exhala' ? 'scale-90' : 'scale-100'
        : 'scale-100';

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-slate-800 text-white rounded-2xl shadow-lg">
            <div
                className={`w-40 h-40 bg-sky-500 rounded-full flex items-center justify-center transition-transform duration-[4000ms] ease-in-out ${circleClass}`}
            >
                <div className="text-center">
                    <p className="text-xl font-bold">{isBreathing ? phase : 'Respira'}</p>
                    {isBreathing && <p className="text-sm">4s</p>}
                </div>
            </div>
            <button
                onClick={() => setIsBreathing(!isBreathing)}
                className="mt-6 px-6 py-2 bg-sky-300 text-slate-900 font-semibold rounded-full"
            >
                {isBreathing ? 'Detener' : 'Comenzar 3 min'}
            </button>
        </div>
    );
};

const ZenModeDescription: React.FC<{ mode: ZenMode }> = ({ mode }) => {
    const content = {
        [ZenMode.Breathing]: {
            title: "Conecta con tu Respiración",
            description: "Tu respiración es un ancla en el presente. Con estos ejercicios, aprenderás a usarla para calmar tu mente, reducir la tensión y encontrar un momento de paz. ¡Regálate este respiro!",
        },
        [ZenMode.Meditation]: {
            title: "Cultiva la Calma Interior",
            description: "La meditación te ayuda a observar tus pensamientos y emociones con amabilidad. Estas guías cortas están diseñadas para fortalecer tu paciencia, fomentar la autoaceptación y reconectar contigo. Eres más fuerte de lo que crees.",
        },
    };

    const { title, description } = content[mode];

    return (
        <div className="my-6 p-5 bg-slate-800 rounded-2xl text-center shadow-inner animate-fade-in">
            <h2 className="text-xl font-bold text-sky-300">{title}</h2>
            <p className="text-slate-300 mt-2 text-base">{description}</p>
        </div>
    );
};


const ZenSpace: React.FC = () => {
    const [mode, setMode] = useState<ZenMode>(ZenMode.Breathing);

    return (
        <div className="p-4 bg-slate-900 min-h-screen">
            <header className="text-center my-4">
                <h1 className="text-3xl font-bold text-sky-200">Espacio Zen</h1>
                <p className="text-md text-sky-400 mt-1">Tu refugio para calmar la mente.</p>
            </header>

            <div className="flex justify-center space-x-2 my-6">
                {Object.values(ZenMode).map(zenMode => (
                    <button
                        key={zenMode}
                        onClick={() => setMode(zenMode)}
                        className={`px-3 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                            mode === zenMode ? 'bg-sky-400 text-slate-900' : 'bg-slate-700 text-slate-300'
                        }`}
                    >
                        {zenMode}
                    </button>
                ))}
            </div>
            
            <ZenModeDescription key={mode} mode={mode} />

            {mode === ZenMode.Breathing && <BreathingExercise />}
            
            <div className="mt-8 space-y-3">
                {ZEN_ACTIVITIES.filter(act => act.type === mode).map(activity => (
                    <div key={activity.id} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-slate-700">
                        <div>
                            <h3 className="font-semibold text-slate-200">{activity.title}</h3>
                            <p className="text-sm text-slate-400">{activity.description}</p>
                        </div>
                        <span className="text-sm text-slate-400">{activity.duration} min</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ZenSpace;