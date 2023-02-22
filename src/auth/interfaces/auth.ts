export interface AuthState {
    status: string,
    uid?: string | null,
    email?: string | null,
    displayName?: string | null,
    photoURL?: string | null,
    errorMessage?: string | null
}

export const initState: AuthState = {
    status: 'not-authenticated',
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    errorMessage: ''
}