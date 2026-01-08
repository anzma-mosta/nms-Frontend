import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyD2WqvStCwT8CilASh-ZFm867plnnSTAms",
  authDomain: "nms-frontend.firebaseapp.com",
  projectId: "nms-frontend",
  storageBucket: "nms-frontend.firebasestorage.app",
  messagingSenderId: "488763935674",
  appId: "1:488763935674:web:df2738f3626107491a2b83",
  measurementId: "G-93RPEK3L4B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firestore with persistence enabled to handle offline errors
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});
