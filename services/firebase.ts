import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { PortfolioItem } from '../types';

// Configuration provided by user
const firebaseConfig = {
  apiKey: "AIzaSyDJoI2d4yhRHl-jOsZMp57V41Skn8HYFa8",
  authDomain: "touchgame-bf7e2.firebaseapp.com",
  databaseURL: "https://touchgame-bf7e2-default-rtdb.firebaseio.com",
  projectId: "touchgame-bf7e2",
  storageBucket: "touchgame-bf7e2.firebasestorage.app",
  messagingSenderId: "289443560144",
  appId: "1:289443560144:web:6ef844f5e4a022fca13cd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Auth Functions
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const logout = async () => {
  await signOut(auth);
};

// Portfolio Functions
export const addPortfolioItem = async (data: PortfolioItem) => {
  try {
    const docRef = await addDoc(collection(db, "portfolios"), {
      ...data,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error("Error adding portfolio: ", e);
    return { success: false, error: e };
  }
};

export const updatePortfolioItem = async (id: string, data: Partial<PortfolioItem>) => {
  try {
    const docRef = doc(db, "portfolios", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (e) {
    console.error("Error updating portfolio: ", e);
    return { success: false, error: e };
  }
};

export const deletePortfolioItem = async (id: string) => {
  try {
    await deleteDoc(doc(db, "portfolios", id));
    return { success: true };
  } catch (e) {
    console.error("Error deleting portfolio: ", e);
    return { success: false, error: e };
  }
};

export const getPortfolioItems = async (): Promise<PortfolioItem[]> => {
  try {
    const q = query(collection(db, "portfolios"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const items: PortfolioItem[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as PortfolioItem);
    });
    return items;
  } catch (e) {
    console.error("Error fetching portfolios: ", e);
    // Throwing error to let the UI handle permission denied states
    throw e;
  }
};

export { db, auth };