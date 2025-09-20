import React, { useState } from 'react';
import { Exercise, ExerciseCategory } from '../types';

interface ExerciseLibraryProps {
    exercises: Exercise[];
    onSelectExercise: (exercise: Exercise) => void;
}

const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({ exercises, onSelectExercise }) => {
    const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'All'>('All');

    const facePartCategories = [
        ExerciseCategory.Frente,
        ExerciseCategory.Ojos,
        ExerciseCategory.Mejillas,
        ExerciseCategory.Boca,
    ];

    const filteredExercises = selectedCategory === 'All'
        ? exercises
        : exercises.filter(e => e.category === selectedCategory);

    const FilterButton: React.FC<{
        label: string;
        onClick: () => void;
        isActive: boolean;
        className?: string;
    }> = ({ label, onClick, isActive, className = '' }) => (
        <button
            onClick={onClick}
            className={`w-full text-center px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isActive
                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            } ${className}`}
        >
            {label}
        </button>
    );

    return (
        <div className="p-4">
            <header className="text-center my-4">
                <h1 className="text-3xl font-bold text-blue-700">Gimnasio Facial</h1>
                <p className="text-md text-blue-600 mt-1 px-4">
                    Encuentra los movimientos perfectos para ti. Filtra por categoría o por la zona del rostro que quieres trabajar.
                </p>
            </header>

            <div className="mb-8 space-y-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-600 mb-3">Categoría Principal</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <FilterButton
                            label="Todos"
                            onClick={() => setSelectedCategory('All')}
                            isActive={selectedCategory === 'All'}
                        />
                        <FilterButton
                            label={ExerciseCategory.Masajes}
                            onClick={() => setSelectedCategory(ExerciseCategory.Masajes)}
                            isActive={selectedCategory === ExerciseCategory.Masajes}
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-slate-600 mb-3">Partes del Rostro</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {facePartCategories.map(category => (
                             <FilterButton
                                key={category}
                                label={category}
                                onClick={() => setSelectedCategory(category)}
                                isActive={selectedCategory === category}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                 {filteredExercises.length > 0 ? (
                    filteredExercises.map(exercise => (
                        <div
                            key={exercise.id}
                            onClick={() => onSelectExercise(exercise)}
                            className="bg-white p-4 rounded-xl shadow-md flex items-center cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <img src={exercise.imageUrl} alt={exercise.name} className="w-20 h-20 rounded-lg object-cover mr-4"/>
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg text-slate-800">{exercise.name}</h3>
                                <p className="text-sm text-slate-500">{exercise.category}</p>
                            </div>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    ))
                 ) : (
                    <div className="text-center py-12 bg-white rounded-xl shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="mt-4 text-slate-500 font-semibold">No se encontraron ejercicios.</p>
                        <p className="text-sm text-slate-400">Prueba con otro filtro.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default ExerciseLibrary;
