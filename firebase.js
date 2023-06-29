var firebaseConfig = {
    apiKey: "AIzaSyBYzhgTf8HjgfxmX2ca6j-npsek29FRJWc",
    authDomain: "learning-resource-online.firebaseapp.com",
    databaseURL: "https://learning-resource-online-default-rtdb.firebaseio.com",
    projectId: "learning-resource-online",
    storageBucket: "learning-resource-online.appspot.com",
    messagingSenderId: "434275067319",
    appId: "1:434275067319:web:8abda8340eb639b0e83432",
    measurementId: "G-EFM7ESQFJ6"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();