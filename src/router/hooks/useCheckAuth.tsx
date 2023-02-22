import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { logout, login } from "../../store/authSlice";
import { FirebaseAuth } from "../../firebase/config";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store/store";
import { startLoadingNotes } from "../../store/agenda/thunks";

export const useCheckAuth = () => {

    const { status } = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout({ status: 'not-authenticated' }));
            const { email, uid, displayName, photoURL } = user;
            dispatch(login({ status: 'authenticated', email, uid, displayName, photoURL }));
            dispatch( startLoadingNotes() );
        });
    }, []);

    return {
        status, 
    }

}
