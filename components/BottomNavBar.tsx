import React from 'react';
import { View } from '../types';
import { HomeIcon, GymIcon, BookIcon, ZenIcon, ProgressIcon } from './Icons';

interface BottomNavBarProps {
    currentView: View;
    setView: (view: View) => void;
}

const NavItem: React.FC<{
    label: string;
    view: View;
    currentView: View;
    setView: (view: View) => void;
    children: React.ReactNode;
}> = ({ label, view, currentView, setView, children }) => {
    const isActive = currentView.startsWith(view);
    const color = isActive ? 'text-blue-600' : 'text-slate-500';

    return (
        <button
            onClick={() => setView(view)}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${color} hover:text-blue-500`}
        >
            {children}
            <span className="text-xs">{label}</span>
        </button>
    );
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentView, setView }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 flex z-50">
            <NavItem label="Inicio" view="DASHBOARD" currentView={currentView} setView={setView}>
                <HomeIcon />
            </NavItem>
            <NavItem label="Ejercicios" view="EXERCISES" currentView={currentView} setView={setView}>
                <GymIcon />
            </NavItem>
            <NavItem label="Enciclopedia" view="ENCYCLOPEDIA" currentView={currentView} setView={setView}>
                <BookIcon />
            </NavItem>
            <NavItem label="Espacio Zen" view="ZEN" currentView={currentView} setView={setView}>
                <ZenIcon />
            </NavItem>
            <NavItem label="Progreso" view="PROGRESS" currentView={currentView} setView={setView}>
                <ProgressIcon />
            </NavItem>
        </nav>
    );
};

export default BottomNavBar;