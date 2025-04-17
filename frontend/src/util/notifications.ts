
const requestNotificationPermission = async () => {
    if (Notification.permission === "granted") {
        return true
    } else if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission()
        return permission === "granted"
    }
    return false
}

const sendWaterReminder = () => {
    if (Notification.permission === "granted") {
        new Notification("Time to drink water!", {
            body: "Stay hydrated! Drink a glass of water now.",
        })
    }
}

export const sendGoalHitNotification = (title: string, goalValue: string, unit: string) => {
    if (Notification.permission === "granted") {
        new Notification("Congratulations!", {
            body: `You've hit your ${title} goal of ${goalValue} ${unit} for today! Keep up the great work!`,
        })
    }
}

const sendNotificationAt20 = () => {
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(20, 0, 0, 0)

    if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1)
    }

    const timeUntil20 = targetTime.getTime() - now.getTime()

    setTimeout(() => {
        if (Notification.permission === "granted") {
            new Notification("Reminder", {
                body: "Reminder to fill out or update today's entries!",
            })
        }
    }, timeUntil20)
}

const scheduleWaterReminders = () => {
    const interval = 60 * 60 * 1000
    setInterval(() => {
        sendWaterReminder();
    }, interval);
};

const initNotifications = async () => {
    const permissionGranted = await requestNotificationPermission()
    if (permissionGranted) {
        scheduleWaterReminders()
        sendNotificationAt20()
    }
};

initNotifications();