import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { registerUserWithEmailPassword } from './thunks';

export interface authSliceState {
    status?: string,
    uid?: string | null,
    email?: string | null,
    displayName?: string | null,
    photoURL?: string | null,
    errorMessage?: string | null
}

export const initialState: authSliceState = {
    status: 'checking',
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    errorMessage: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<authSliceState>) => {
            state.status        = 'authenticated';
            state.uid           = action.payload.uid;
            state.displayName   = action.payload.displayName;
            state.email         = action.payload.email;
            state.photoURL      = action.payload.photoURL;
            state.errorMessage  = action.payload.errorMessage;
        },
        logout: (state, action: PayloadAction<authSliceState>) => {
            state.status        = 'not-authenticated';
            state.uid           = action.payload.uid;
            state.displayName   = action.payload.displayName;
            state.email         = action.payload.email;
            state.photoURL      = action.payload.photoURL;
            state.errorMessage  = action.payload.errorMessage;
        },
        checkingCredentials: ( state, action: PayloadAction<authSliceState> ) => {
            state.status = 'checking';
        },
        clearState: ( state ) => {
            state.status = 'not-authenticated';
            state.errorMessage = '';
        }
    },
    extraReducers(builder) {
        builder.addCase( registerUserWithEmailPassword.fulfilled, ( state, action ) => {
            
        } )
    },
});

export const { login, logout, checkingCredentials, clearState } = authSlice.actions;