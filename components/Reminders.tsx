import React, { useState, useEffect } from 'react';
import { ReminderSettings } from '../types';
import { BackIcon } from './Icons';
import { requestNotificationPermission } from '../utils/notifications';

interface RemindersProps {
    reminders: ReminderSettings;
    setReminders: (reminders: ReminderSettings) => void;
    onBack: () => void;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void; disabled?: boolean }> = ({ checked, onChange, disabled }) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        disabled={disabled}
        className={`${
            checked ? 'bg-blue-500' : 'bg-slate-200'
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors disabled:opacity-50`}
    >
        <span className={`${
            checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
    </button>
);


const Reminders: React.FC<RemindersProps> = ({ reminders, setReminders, onBack }) => {
    const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
    
    useEffect(() => {
      // Periodically check permission in case user changes it in browser settings
      const interval = setInterval(() => {
        if (Notification.permission !== notificationPermission) {
          setNotificationPermission(Notification.permission);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [notificationPermission]);

    const handleToggle = async (type: 'exercise' | 'zen') => {
        const isEnabling = !reminders[type].enabled;
        let permissionGranted = notificationPermission === 'granted';

        if (isEnabling && !permissionGranted) {
            const granted = await requestNotificationPermission();
            if (granted) {
                setNotificationPermission('granted');
                permissionGranted = true;
            } else {
                 // Update state to reflect denial
                setNotificationPermission(Notification.permission);
            }
        }
        
        // Only enable the toggle if permission is granted
        if (isEnabling && !permissionGranted) {
            return;
        }

        setReminders({
            ...reminders,
            [type]: { ...reminders[type], enabled: isEnabling ? permissionGranted : false },
        });
    };

    const handleTimeChange = (type: 'exercise' | 'zen', time: string) => {
         setReminders({
            ...reminders,
            [type]: { ...reminders[type], time },
        });
    };

    return (
        <div className="p-4">
            <header className="relative flex items-center justify-center mb-6">
                <button onClick={onBack} className="absolute left-0 p-2">
                    <BackIcon className="w-6 h-6 text-slate-600" />
                </button>
                <h1 className="text-2xl font-bold text-blue-700 text-center">Recordatorios</h1>
            </header>
            
            <div className="space-y-6">
                {notificationPermission === 'denied' && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                        <p className="font-bold">Permiso denegado</p>
                        <p>Las notificaciones están bloqueadas. Para recibir recordatorios, necesitas habilitar los permisos para este sitio en la configuración de tu navegador.</p>
                    </div>
                )}

                <div className="bg-white p-5 rounded-xl shadow-md">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Ejercicios Diarios</h2>
                    <div className="flex items-center justify-between">
                        <label htmlFor="exercise-reminder" className="text-slate-600">Activar recordatorio</label>
                        <ToggleSwitch checked={reminders.exercise.enabled} onChange={() => handleToggle('exercise')} />
                    </div>
                    {reminders.exercise.enabled && (
                         <div className="mt-4">
                            <label htmlFor="exercise-time" className="block text-sm font-medium text-slate-700 mb-1">Hora</label>
                            <input
                                type="time"
                                id="exercise-time"
                                value={reminders.exercise.time}
                                onChange={(e) => handleTimeChange('exercise', e.target.value)}
                                className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    )}
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Momento de Relajación</h2>
                     <div className="flex items-center justify-between">
                        <label htmlFor="zen-reminder" className="text-slate-600">Activar recordatorio</label>
                        <ToggleSwitch checked={reminders.zen.enabled} onChange={() => handleToggle('zen')} />
                    </div>
                     {reminders.zen.enabled && (
                         <div className="mt-4">
                            <label htmlFor="zen-time" className="block text-sm font-medium text-slate-700 mb-1">Hora</label>
                            <input
                                type="time"
                                id="zen-time"
                                value={reminders.zen.time}
                                onChange={(e) => handleTimeChange('zen', e.target.value)}
                                className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reminders;