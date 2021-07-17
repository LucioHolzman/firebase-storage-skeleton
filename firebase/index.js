import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "api-key",
    authDomain: "auth-domain",
    projectId: "project-id",
    storageBucket: "storage-bucket",
    messagingSenderId: "messaging-sender-id",
    appId: "app-id"
  };

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app(); 

const storage = firebase.storage();

export {storage, firebase as default};