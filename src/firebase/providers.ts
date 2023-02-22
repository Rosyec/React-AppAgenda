import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    signInWithEmailAndPassword
} from "firebase/auth";
import { initState } from "../auth/interfaces/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromresponse(response);
        const { displayName, email, photoURL, uid } = response.user;
        return {
            ok: true,
            user: { ...initState, status: 'authenticated', email, displayName, photoURL, uid }
        }
    } catch (error: any) {
        return { ok: false, user: initState, error: error.code }
    }
}

export const registerUser = async ({ name, email, password }: User) => {
    try {
        const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, displayName, photoURL } = response.user;
        await updateProfile(response.user, { displayName: name });
        return {
            ok: true,
            user: { ...initState, status: 'authenticated', email, displayName: name, photoURL, uid }
        }
    } catch (error: any) {
        return { ok: false, user: initState, error: error.code }
    }
}

export const loginUser = async ({ email, password }: User) => {
    try {
        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const user = response.user;
        return {
            ok: true,
            user: { ...initState, status: 'authenticated', email, displayName: user.displayName, photoURL: user.photoURL, uid: user.uid }
        }
    } catch (error: any) {
        return {
            ok: false, user: initState, error: error.code
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}

interface User {
    email: string,
    password: string,
    name?: string
}