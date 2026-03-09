import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyANFnCB3u_NmOuJScEGMPLFQemcpqLGJwA',
  authDomain: 'wowo-blip-office.firebaseapp.com',
  projectId: 'wowo-blip-office',
  storageBucket: 'wowo-blip-office.firebasestorage.app',
  messagingSenderId: '18582872789',
  appId: '1:18582872789:web:e1e43c32e2791c9a4bf85c',
  measurementId: 'G-D5FYVFF90H',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
