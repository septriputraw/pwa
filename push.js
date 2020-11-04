var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BMdNPojiSTuh4gb0W7KScddT_9UrSJhnakjolzhmAHE42_bJbG4KZjtwHIp2R-ZJIoxo5Q8R_ZNo31xge35QITM",
   "privateKey": "cMfEoKcpRSz_WqEKVFM6iXvL1FloB7TyzmXxvwkIvFI"
};
 
 
webPush.setVapidDetails(
   'mailto:septriputraw@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ch-YYYW-M-I:APA91bGWdzen0O9f4Xn91t2pzo9lE14_ilmw9w6BTh_e30gGDbfVDN1hBfcfuFbzQsGel5yjdyI3Z-hYoxBBsND7HET2qfAIWyPzRZ6aNoVfrIdv4Os8tdS1lZfvFjP_ZplpbRhWBCeQ",
   "keys": {
       "p256dh": "BItxVsHCay07Ic1Lmv4yPVerC1M/zTaAOSUZl8gptlilO7aj9jUWGl/cGP7Ma7COVhd5vLIfvxdGrYsN338mqq0=",
       "auth": "Ww0xfqc0rgPBC7W2Qx/2zw=="
   }
};
var payload = 'Yuhuuu! Aplikasi Anda sudah dapat menerima push notifikasi Nih!';
 
var options = {
   gcmAPIKey: '950502043798',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);