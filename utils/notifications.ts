
// Store timeout IDs in a global object to manage them across the app
const notificationTimeouts: { [key: string]: number } = {};

export const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
        console.warn('Este navegador no soporta notificaciones de escritorio.');
        return false;
    }

    if (Notification.permission === 'granted') {
        return true;
    }

    // We can only request permission if it's not denied.
    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }

    return false;
};

const showNotification = (title: string, body: string) => {
    // We must check permission again before showing notification
    if (Notification.permission === 'granted') {
        // Using service worker if available is more robust, but for simplicity, we use the basic Notification API.
         new Notification(title, { body });
    }
};

export const scheduleNotification = (id: string, title: string, body: string, time: string) => {
    // Clear any existing notification for this ID before scheduling a new one
    cancelNotification(id);

    const [hours, minutes] = time.split(':').map(Number);
    
    const now = new Date();
    
    let notificationTime = new Date();
    notificationTime.setHours(hours, minutes, 0, 0);

    // If the time has already passed for today, schedule it for tomorrow
    if (notificationTime <= now) {
        notificationTime.setDate(notificationTime.getDate() + 1);
    }
    
    const timeToNotification = notificationTime.getTime() - now.getTime();

    if (timeToNotification < 0) return; // Should not happen, but as a safeguard.

    const timeoutId = window.setTimeout(() => {
        showNotification(title, body);
        // Reschedule for the next day automatically
        scheduleNotification(id, title, body, time);
    }, timeToNotification);

    notificationTimeouts[id] = timeoutId;
};

export const cancelNotification = (id:string) => {
    if (notificationTimeouts[id]) {
        clearTimeout(notificationTimeouts[id]);
        delete notificationTimeouts[id];
    }
};
