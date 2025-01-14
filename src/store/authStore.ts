import {create} from 'zustand'
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    User,
    UserCredential
} from "firebase/auth"

import {auth} from "@/lib/Firebase.ts";


export interface DBUser {
    firebaseUID: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    role: 'user' | 'admin' | 'superAdmin';
}

type AuthState = {
    currentUser: User | null;
    authLoading: boolean;
    signUp: (email: string, password: string, displayName: string, photoURL?: string) => Promise<UserCredential>;
    signInWithGoogle: () => Promise<User>;
    logout: () => Promise<void>;
    login: (email: string, password: string) => void;

}

type AuthStore = AuthState & {
    setAuthLoading: (loading: boolean) => void;
    setCurrentUser: (user: User | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    currentUser: null,
    authLoading: true,


    setAuthLoading: (loading: boolean) => set({authLoading: loading}),
    setCurrentUser: (user: User | null) => set({currentUser: user}),

    signUp: async (email: string, password: string, displayName?: string, photoURL?: string) => {
        console.log(email, password, displayName, photoURL);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential?.user;
            if (displayName || photoURL) {
                console.log(photoURL)
                await updateProfile(user, {displayName, photoURL});
                const updatedUser = auth.currentUser;
                if (updatedUser) {
                    set({currentUser: updatedUser});
                }
            }
            // await syncUserToDB(user);
            // await generateJWT(email);
            return userCredential;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    signInWithGoogle: async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            // await syncUserToDB(result.user);
            // await generateJWT(result?.user?.email);
            return result.user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
            // await clearJWTToken();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    login: async (email: string, password: string) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log(result);
            // await syncUserToDB(result.user);
            // await generateJWT(result?.user?.email);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
}))

onAuthStateChanged(auth, (user: User | null) => {
        useAuthStore.getState().setCurrentUser(user);
        useAuthStore.getState().setAuthLoading(false);
    },
    (error: Error) => {
        console.error("Auth state change error:", error);
        useAuthStore.getState().setAuthLoading(false);
    }
);


export default useAuthStore;