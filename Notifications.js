import PushNotification from 'react-native-push-notification';

export const configureNotifications = () => {
  PushNotification.createChannel(
    {
      channelId: 'habitup_channel',
      name: 'HabitUp Kanalı',
      importance: 4, // HIGH importance
      vibrate: true,
    },
    (created) => console.log(`Kanal oluşturuldu: ${created}`)
  );

  PushNotification.configure({
    onNotification: function (notification) {
      console.log('Bildirim alındı:', notification);
    },
    requestPermissions: true,
  });
};

// Günlük bildirim ayarla
export const scheduleDailyNotification = (hour, minute) => {
  PushNotification.cancelAllLocalNotifications(); // Önce eski bildirimleri temizle

  PushNotification.localNotificationSchedule({
    channelId: 'habitup_channel',
    title: 'Alışkanlık Takibi',
    message: 'Bugünün alışkanlıklarını tamamladın mı?',
    date: new Date(Date.now() + 1000), // Şimdilik test için 1 saniye sonra çalıştır
    allowWhileIdle: true,
    repeatType: 'day', // Her gün tekrarla
    repeatTime: 1,
  });

  console.log(`Her gün saat ${hour}:${minute}'de bildirim ayarlandı.`);
};