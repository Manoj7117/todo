import * as firebase from 'firebase'

const config = {
    apiKey: "xxxxxxxxxx",
    authDomain: "todo-1010.firebaseapp.com",
    databaseURL: "https://todo-1010.firebaseio.com",
    projectId: "todo-1010",
    storageBucket: "todo-1010.appspot.com",
    messagingSenderId: "533469719296"
};
firebase.initializeApp(config);
export default firebase;