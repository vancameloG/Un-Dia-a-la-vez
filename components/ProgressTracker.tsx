import React, { useState, useCallback, useMemo } from 'react';
import { ProgressPhoto, CompletedExercise } from '../types';
import { CameraIcon, PlusIcon } from './Icons';
import PhotoCapture from './PhotoCapture';
import ActivityChart, { ChartData } from './ActivityChart';

interface ProgressTrackerProps {
    photos: ProgressPhoto[];
    completedExercises: CompletedExercise[];
    addPhoto: (photo: ProgressPhoto) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ photos, completedExercises, addPhoto }) => {
    const [isCapturing, setIsCapturing] = useState(false);
    const [comparisonPhotos, setComparisonPhotos] = useState<ProgressPhoto[]>([]);

    const handlePhotoTaken = useCallback((imageUrl: string) => {
        addPhoto({
            id: new Date().toISOString(),
            date: new Date(),
            imageUrl,
            tags: [],
        });
        setIsCapturing(false);
    }, [addPhoto]);

    const toggleComparison = (photo: ProgressPhoto) => {
        setComparisonPhotos(prev => {
            if (prev.find(p => p.id === photo.id)) {
                return prev.filter(p => p.id !== photo.id);
            }
            if (prev.length < 2) {
                return [...prev, photo];
            }
            // Replace the oldest selection if trying to add a third
            return [prev[1], photo];
        });
    };

    const chartData = useMemo(() => {
        const today = new Date();
        const last7Days: ChartData[] = [];
        const dayLabels = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const exercisesOnDay = completedExercises.filter(ex => {
                const exDate = new Date(ex.date);
                exDate.setHours(0, 0, 0, 0);
                return exDate.getTime() === date.getTime();
            }).length;

            const photosOnDay = photos.filter(p => {
                const pDate = new Date(p.date);
                pDate.setHours(0, 0, 0, 0);
                return pDate.getTime() === date.getTime();
            }).length;

            last7Days.push({
                date: dayLabels[date.getDay()],
                exercises: exercisesOnDay,
                photos: photosOnDay,
            });
        }
        return last7Days;
    }, [completedExercises, photos]);

    return (
        <div className="p-4">
            {isCapturing && <PhotoCapture onPhotoTaken={handlePhotoTaken} onClose={() => setIsCapturing(false)} />}

            <header className="text-center my-4">
                <h1 className="text-3xl font-bold text-blue-700">Mi Progreso</h1>
                <p className="text-md text-blue-600 mt-1">Visualiza tus logros y mantente motivado.</p>
            </header>

            <section className="mb-8 space-y-6">
                 <h2 className="text-xl font-bold text-blue-600">Resumen de Actividad</h2>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-md text-center">
                        <p className="text-3xl font-bold text-blue-500">{completedExercises.length}</p>
                        <p className="text-sm text-slate-500">Ejercicios Completados</p>
                    </div>
                     <div className="bg-white p-4 rounded-xl shadow-md text-center">
                        <p className="text-3xl font-bold text-blue-500">{photos.length}</p>
                        <p className="text-sm text-slate-500">Fotos Tomadas</p>
                    </div>
                 </div>
                 <ActivityChart data={chartData} />
            </section>

            {comparisonPhotos.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-blue-600 mb-3">Comparación</h2>
                    <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow-lg">
                        {comparisonPhotos.map(photo => (
                             <div key={photo.id}>
                                <img src={photo.imageUrl} alt={`Progreso ${photo.date.toLocaleDateString()}`} className="rounded-lg w-full aspect-square object-cover" />
                                <p className="text-center text-sm mt-2 text-slate-600 font-semibold">{photo.date.toLocaleDateString()}</p>
                            </div>
                        ))}
                         {comparisonPhotos.length === 1 && (
                            <div className="rounded-lg w-full aspect-square border-2 border-dashed border-slate-300 flex items-center justify-center text-center text-slate-500 p-4">
                                Selecciona otra foto para comparar
                            </div>
                         )}
                    </div>
                </section>
            )}

            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-blue-600">Línea de Tiempo Fotográfica</h2>
                     <button
                        onClick={() => setIsCapturing(true)}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors shadow"
                    >
                        <PlusIcon className="w-5 h-5 mr-1" />
                        Añadir Foto
                    </button>
                </div>
                {photos.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow">
                        <CameraIcon className="w-16 h-16 mx-auto text-slate-300" />
                        <p className="mt-4 text-slate-500">Aún no has añadido ninguna foto.</p>
                        <p className="text-sm text-slate-400">¡Toma tu primera foto para empezar a seguir tu progreso!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-2">
                        {photos.map(photo => (
                            <div key={photo.id} className="relative" onClick={() => toggleComparison(photo)}>
                                <img
                                    src={photo.imageUrl}
                                    alt={`Progreso ${photo.date.toLocaleDateString()}`}
                                    className={`w-full aspect-square object-cover rounded-lg cursor-pointer transition-all ${
                                        comparisonPhotos.find(p => p.id === photo.id) ? 'ring-4 ring-blue-500 ring-offset-2' : 'ring-1 ring-slate-200'
                                    }`}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-0.5 rounded-b-lg">
                                    {photo.date.toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProgressTracker;