import React, { useState, useEffect, useCallback } from 'react';
import { Exercise } from '../types';
import { BackIcon, SpeakerOnIcon, SpeakerOffIcon } from './Icons';
import VirtualMirror from './VirtualMirror';

interface ExerciseDetailProps {
    exercise: Exercise;
    onBack: () => void;
    onComplete: (exerciseId: string) => void;
}

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ exercise, onBack, onComplete }) => {
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(exercise.duration);
    const [repsLeft, setRepsLeft] = useState(exercise.reps);
    const [showMirror, setShowMirror] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const completeExercise = useCallback(() => {
        setIsActive(false);
        setIsCompleted(true);
        onComplete(exercise.id);
    }, [onComplete, exercise.id]);

    useEffect(() => {
        // Fix: Use 'number' for setTimeout return type in browser environments instead of 'NodeJS.Timeout'.
        let timer: number | undefined;
        if (isActive && timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (isActive && timeLeft === 0) {
            if (repsLeft > 1) {
                setRepsLeft(repsLeft - 1);
                setTimeLeft(exercise.duration);
            } else {
                completeExercise();
            }
        }
        return () => clearTimeout(timer);
    }, [isActive, timeLeft, repsLeft, exercise.duration, completeExercise]);
    
    useEffect(() => {
        // Cleanup function to stop speech synthesis when the component unmounts
        return () => {
            if ('speechSynthesis' in window && speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
        };
    }, []);

    const handleStartStop = () => {
        if (isCompleted) return; // Should be handled by another button
        if (isActive) {
            setIsActive(false);
        } else {
            setRepsLeft(exercise.reps);
            setTimeLeft(exercise.duration);
            setIsActive(true);
            setIsCompleted(false);
        }
    };

    const handleReset = () => {
        setIsActive(false);
        setIsCompleted(false);
        setRepsLeft(exercise.reps);
        setTimeLeft(exercise.duration);
        if ('speechSynthesis' in window) speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const handleToggleSpeech = useCallback(() => {
        if (!('speechSynthesis' in window)) {
            alert('Lo sentimos, tu navegador no soporta la síntesis de voz.');
            return;
        }

        if (isSpeaking) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const instructionsText = exercise.instructions.join('. ');
            const utterance = new SpeechSynthesisUtterance(instructionsText);
            utterance.lang = 'es-ES';
            utterance.rate = 0.85; // Un ritmo más lento y natural
            utterance.pitch = 1; // Tono de voz estándar
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => {
                console.error("Error en la síntesis de voz.");
                setIsSpeaking(false);
            };
            speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    }, [isSpeaking, exercise.instructions]);


    const progressPercentage = (timeLeft / exercise.duration) * 100;
    
    return (
        <div className="p-4 pb-16">
            <header className="relative flex items-center justify-center mb-4">
                <button onClick={onBack} className="absolute left-0 p-2">
                    <BackIcon className="w-6 h-6 text-slate-600" />
                </button>
                <h1 className="text-2xl font-bold text-blue-700 text-center">{exercise.name}</h1>
            </header>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img src={exercise.imageUrl} alt={exercise.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="font-bold text-lg mb-2 text-slate-800">Instrucciones:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-slate-600">
                            {exercise.instructions.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                        <button 
                            onClick={handleToggleSpeech}
                            className="w-full mt-4 py-3 bg-blue-100 text-blue-700 font-semibold rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                            aria-label={isSpeaking ? 'Detener lectura de instrucciones' : 'Leer instrucciones en voz alta'}
                        >
                            {isSpeaking ? <SpeakerOffIcon className="h-5 w-5 mr-2" /> : <SpeakerOnIcon className="h-5 w-5 mr-2" />}
                            {isSpeaking ? 'Detener Voz' : 'Escuchar Instrucciones'}
                        </button>
                    </div>

                    <div className="text-center my-8">
                        {isCompleted ? (
                            <div className="flex flex-col items-center justify-center h-40 completion-message">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 animate-pop-in" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <h3 className="text-2xl font-bold text-green-700 mt-4 animate-fade-in" style={{ animationDelay: '200ms' }}>¡Ejercicio Completado!</h3>
                                <p className="text-slate-600 animate-fade-in" style={{ animationDelay: '400ms' }}>Tu progreso ha sido registrado.</p>
                            </div>
                        ) : (
                            <div className="relative w-40 h-40 mx-auto">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle className="text-slate-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                                    <circle
                                        className="text-blue-500"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="45"
                                        cx="50"
                                        cy="50"
                                        strokeDasharray={2 * Math.PI * 45}
                                        strokeDashoffset={(2 * Math.PI * 45) * (1 - progressPercentage / 100)}
                                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-blue-700">{timeLeft}s</span>
                                    <span className="text-slate-500">Reps: {repsLeft}/{exercise.reps}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex justify-center space-x-4 mb-6">
                        <button 
                            onClick={isCompleted ? onBack : handleStartStop} 
                            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-colors"
                        >
                            {isCompleted ? 'Volver' : isActive ? 'Pausar' : 'Iniciar'}
                        </button>
                         <button onClick={handleReset} className="px-6 py-3 bg-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-300 transition-colors">
                            {isCompleted ? 'Hacer de Nuevo' : 'Reiniciar'}
                        </button>
                    </div>
                     <button 
                        onClick={() => setShowMirror(!showMirror)}
                        className="w-full mt-4 py-3 bg-sky-100 text-sky-700 font-semibold rounded-full flex items-center justify-center hover:bg-sky-200 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 4.372a1 1 0 011.414 0l2.121 2.121a1 1 0 010 1.414l-1.414 1.414L15.536 8.2a1 1 0 010-1.414l-1.141-1.141-1.141 1.141a1 1 0 01-1.414-1.414l2.121-2.121zM4 6h8v8H4V6z" />
                        </svg>
                        {showMirror ? 'Ocultar Espejo Virtual' : 'Activar Espejo Virtual'}
                    </button>
                </div>
            </div>
            {showMirror && <VirtualMirror onClose={() => setShowMirror(false)} />}
        </div>
    );
};

export default ExerciseDetail;