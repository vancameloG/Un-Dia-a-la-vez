import React, { useState, useCallback, useEffect } from 'react';
import { View, Exercise, ProgressPhoto, CompletedExercise, ReminderSettings } from './types';
import { EXERCISES, ARTICLES } from './constants';
import Dashboard from './components/Dashboard';
import ExerciseLibrary from './components/ExerciseLibrary';
import ExerciseDetail from './components/ExerciseDetail';
import Encyclopedia from './components/Encyclopedia';
import ZenSpace from './components/ZenSpace';
import ProgressTracker from './components/ProgressTracker';
import BottomNavBar from './components/BottomNavBar';
import Reminders from './components/Reminders';
import { scheduleNotification, cancelNotification } from './utils/notifications';

const App: React.FC = () => {
    const [view, setView] = useState<View>('DASHBOARD');
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [progressPhotos, setProgressPhotos] = useState<ProgressPhoto[]>([]);
    const [completedExercises, setCompletedExercises] = useState<CompletedExercise[]>([]);
    const [reminders, setReminders] = useState<ReminderSettings>({
        exercise: { enabled: false, time: '09:00' },
        zen: { enabled: false, time: '21:00' },
    });
    
    useEffect(() => {
        const savedReminders = localStorage.getItem('mi-kit-bienestar-reminders');
        if (savedReminders) {
            try {
                setReminders(JSON.parse(savedReminders));
            } catch (e) {
                console.error("Failed to parse reminders from localStorage", e);
            }
        }
    }, []);

    const handleSetReminders = useCallback((newReminders: ReminderSettings) => {
        setReminders(newReminders);
        localStorage.setItem('mi-kit-bienestar-reminders', JSON.stringify(newReminders));
    }, []);
    
    useEffect(() => {
        if (reminders.exercise.enabled) {
            scheduleNotification(
                'exercise',
                'Hora de tus ejercicios',
                '¡Es momento de tu rutina facial diaria! La constancia es clave.',
                reminders.exercise.time
            );
        } else {
            cancelNotification('exercise');
        }

        if (reminders.zen.enabled) {
            scheduleNotification(
                'zen',
                'Tu momento de calma',
                'Dedica unos minutos a relajarte con una actividad en el Espacio Zen.',
                reminders.zen.time
            );
        } else {
            cancelNotification('zen');
        }
    }, [reminders]);


    const handleSetView = useCallback((newView: View) => {
        window.scrollTo(0, 0);
        setView(newView);
    }, []);

    const handleSelectExercise = (exercise: Exercise) => {
        setSelectedExercise(exercise);
        handleSetView('EXERCISE_DETAIL');
    };

    const addPhoto = (photo: ProgressPhoto) => {
        setProgressPhotos(prevPhotos => [...prevPhotos, photo].sort((a, b) => b.date.getTime() - a.date.getTime()));
    };

    const handleExerciseCompletion = (exerciseId: string) => {
        setCompletedExercises(prev => [...prev, { date: new Date(), exerciseId }]);
    };

    const renderContent = () => {
        switch (view) {
            case 'DASHBOARD':
                return <Dashboard setView={handleSetView} />;
            case 'EXERCISES':
                return <ExerciseLibrary exercises={EXERCISES} onSelectExercise={handleSelectExercise} />;
            case 'EXERCISE_DETAIL':
                return selectedExercise ? <ExerciseDetail exercise={selectedExercise} onBack={() => handleSetView('EXERCISES')} onComplete={handleExerciseCompletion} /> : <ExerciseLibrary exercises={EXERCISES} onSelectExercise={handleSelectExercise} />;
            case 'ENCYCLOPEDIA':
                return <Encyclopedia articles={ARTICLES} />;
            case 'ZEN':
                return <ZenSpace />;
            case 'PROGRESS':
                return <ProgressTracker photos={progressPhotos} completedExercises={completedExercises} addPhoto={addPhoto} />;
            case 'REMINDERS':
                return <Reminders reminders={reminders} setReminders={handleSetReminders} onBack={() => handleSetView('DASHBOARD')} />;
            default:
                return <Dashboard setView={handleSetView} />;
        }
    };

    return (
        <div className="min-h-screen bg-sky-50 font-sans text-slate-800">
            <main className="pb-20">
                {renderContent()}
            </main>
            <BottomNavBar currentView={view} setView={handleSetView} />
        </div>
    );
};

export default App;