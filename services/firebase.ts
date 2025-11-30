import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { ProjectRequest, PortfolioItem } from '../types';

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

// Estimator Function
export const submitProjectRequest = async (data: ProjectRequest) => {
  try {
    const docRef = await addDoc(collection(db, "project_requests"), {
      ...data,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    console.log("Document written with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, error: e };
  }
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
    return [];
  }
};

export { db, auth };