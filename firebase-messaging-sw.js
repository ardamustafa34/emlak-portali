importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCGZBKU0fHxHnQwikcCIatsxqmnMP0FZlk",
    projectId: "tarim-sanayi-bildirim",
    messagingSenderId: "518342274792",
    appId: "1:518342274792:web:ca24af534476592f41635d"
});

const messaging = firebase.messaging(); // Düzeltildi

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png' 
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});