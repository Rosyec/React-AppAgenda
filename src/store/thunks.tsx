import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithGoogle, registerUser, loginUser, logoutFirebase } from '../firebase/providers';
import { initState } from '../auth/interfaces/auth';
import { login, checkingCredentials, logout, authSliceState } from './authSlice';
import { clearAllNotesLogout } from './agenda/agendaSlice';

export const checkingAuthentication = createAsyncThunk('thunk/authentication',
    async (_, thunkApi) => {
        // return thunkApi.dispatch( checkingCredentials({status: 'checking'}) );
    });

export const startGoogleSingIn = createAsyncThunk('thunk/google/login',
    async (_, thunkApi) => {
        thunkApi.dispatch(checkingCredentials({ status: 'checking' }));
        const response = await signInWithGoogle();
        if (!response.ok) return thunkApi.dispatch(logout(initState));
        const user = response.user!;
        thunkApi.dispatch(login({ ...user }));
    });

export const registerUserWithEmailPassword = createAsyncThunk<authSliceState, User>('thunk/google/register',
    async (params, thunkApi) => {
        thunkApi.dispatch(checkingCredentials({ status: 'checking' }));
        const response = await registerUser(params);
        if (!response.ok) {
            thunkApi.dispatch(logout( { ...initState, errorMessage: response.error } ));
            return initState;
        }
        const user = response.user!;
        thunkApi.dispatch(login({ ...user }));
        return user;
    });

    export const loginUserWithEmailPassword = createAsyncThunk<authSliceState, User>('thunk/google/login',
    async (params, thunkApi) => {
        thunkApi.dispatch(checkingCredentials({ status: 'checking' }));
        const response = await loginUser(params);
        console.log(response)
        if (!response.ok) {
            thunkApi.dispatch(logout( { ...initState, errorMessage: response.error } ));
            return initState;
        }
        const user = response.user!;
        thunkApi.dispatch(login({ ...user }));
        return user;
    });

    export const logoutUser = createAsyncThunk('thunk/google/logout',
    async (_, thunkApi) => {
        thunkApi.dispatch(checkingCredentials({ status: 'checking' }));
        await logoutFirebase();
        thunkApi.dispatch( clearAllNotesLogout() );
        thunkApi.dispatch(logout({}));
    });



interface User {
    email: string,
    password: string,
    name?: string
}

