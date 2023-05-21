const browserNotification = (message) => {
    try {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            new Notification(message);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification(message);
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export default browserNotification