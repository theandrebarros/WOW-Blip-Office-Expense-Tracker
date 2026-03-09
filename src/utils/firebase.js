import { auth, db, storage } from '../config/firebase.js';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { debug } from '../config/constants.js';

export const getCurrentUserId = () => auth.currentUser?.uid || null;
export const getCurrentUsername = () => auth.currentUser?.displayName || null;
export const getCurrentUserEmail = () => auth.currentUser?.email || null;

export const uploadProfilePicture = async (file, userId) => {
  if (!storage || !userId || !file) return null;
  try {
    const storageRef = ref(storage, `profilePictures/${userId}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    await setDoc(doc(db, 'userData', userId), { profilePicture: downloadURL, updatedAt: new Date() }, { merge: true });
    debug.log('Profile picture uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error) {
    debug.error('Error uploading profile picture:', error);
    return null;
  }
};

export const deleteProfilePicture = async (userId) => {
  if (!storage || !db || !userId) return false;
  try {
    const userDoc = await getDoc(doc(db, 'userData', userId));
    const userData = userDoc.data();
    if (userData?.profilePicture) {
      const imageRef = ref(storage, `profilePictures/${userId}`);
      await deleteObject(imageRef);
    }
    await setDoc(doc(db, 'userData', userId), { profilePicture: null, updatedAt: new Date() }, { merge: true });
    debug.log('Profile picture deleted successfully');
    return true;
  } catch (error) {
    debug.error('Error deleting profile picture:', error);
    return false;
  }
};

export const getUserProfileData = async (userId) => {
  if (!db || !userId) {
    debug.log('getUserProfileData: No db or userId');
    return null;
  }
  try {
    const userDoc = await getDoc(doc(db, 'userData', userId));
    if (userDoc.exists()) {
      const data = userDoc.data();
      debug.log('Profile data loaded:', data?.profilePicture ? 'Yes' : 'No');
      return data;
    }
    return null;
  } catch (error) {
    debug.error('Error getting user profile data:', error);
    return null;
  }
};

export const cloudLoadState = async (userId) => {
  if (!db || !userId) return null;
  try {
    const docSnap = await getDoc(doc(db, 'userData', userId));
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.years) return data;
    }
    return null;
  } catch (error) {
    debug.error('Error loading cloud state:', error);
    return null;
  }
};

export const cloudSaveState = async (userId, state) => {
  if (!db || !userId || !state) return false;
  try {
    await setDoc(doc(db, 'userData', userId), { ...state, lastUpdated: new Date() }, { merge: true });
    return true;
  } catch (error) {
    debug.error('Error saving cloud state:', error);
    return false;
  }
};
