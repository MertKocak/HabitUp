import PushNotification from 'react-native-push-notification';
import { presets } from './babel.config';


class Notifications {
    constructor() {
        PushNotification.configure({
            onRegister: function (token) {
            console.log('TOKEN:', token);
            },
            onNotification: function (notification) {
            console.log('NOTIFICATION:', notification);
            },
            popInitialNotification: true,
            requestPermissions: false,
        });

        PushNotification.createChannel(
            {
                channelId: "reminder",
                channelName: 'Task reminder notifications',
            },
            () => {},
        ); 
    }

    schduleNotification(date, title, message) {
        PushNotification.localNotificationSchedule({
            channelId: "reminder",
            title : title,
            message: message,
            id: 1,
            date,
            repeatType: 'day',
        });
    }

    cancelNotification(title) {
        PushNotification.cancelLocalNotification({id: 1});
    }
}

export default new Notifications();