import firebase from '@firebase/app'
import '@firebase/auth'
var config = {
    apiKey: "AIzaSyBciz1u322oZOFtKMbDxlx5Xx9RTTOoADw",
    authDomain: "newchat-dc8c0.firebaseapp.com",
    databaseURL: "https://newchat-dc8c0.firebaseio.com",
    projectId: "newchat-dc8c0",
    storageBucket: "newchat-dc8c0.appspot.com",
    messagingSenderId: "441985178091"
};
firebase.initializeApp(config);

export default firebase;