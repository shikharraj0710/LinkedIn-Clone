import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDnncvmYJTF3LcKYUX1a8X407gZnc6gffE",
    authDomain: "linkedin-clone-8ad3f.firebaseapp.com",
    projectId: "linkedin-clone-8ad3f",
    storageBucket: "linkedin-clone-8ad3f.appspot.com",
    messagingSenderId: "148229977661",
    appId: "1:148229977661:web:c3eba98441b91e08761c54"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

// Firebase storage reference
const storage = getStorage(firebaseApp);

export { db, auth, storage };