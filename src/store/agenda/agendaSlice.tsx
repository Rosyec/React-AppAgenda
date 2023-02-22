import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Note {
    id?: string,
    title: string,
    body: string,
    date: number,
    imageUrls: string[]
}

export interface AgendaSliceState {
    isSaving: boolean,
    messagesaved: string,
    notes: Note[],
    active: Note
}

const DataEmpty: Note = {
    imageUrls: [],
    body: '',
    date: 0,
    title: '',
    id: ''
}

const initialState: AgendaSliceState = {
    isSaving: false,
    messagesaved: '',
    notes: [],
    active: DataEmpty
}

export const agendaSlice = createSlice({
    name: 'agenda',
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action: PayloadAction<Note>) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action: PayloadAction<Note>) => {
            state.active = action.payload;
            state.messagesaved = '';
        },
        setNotes: (state, action: PayloadAction<Note[]>) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messagesaved = '';
        },
        updatedNote: (state, action: PayloadAction<Note>) => {
            state.isSaving = false;
            state.notes = state.notes.map( (item) => (item.id === action.payload.id) ? item = action.payload : item );
            state.messagesaved = `Entrada actualizada correctamente!`;
        },
        setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {
            // ...(Array.from(state.active.imageUrls))
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        clearAllNotesLogout: (state) => {
            state.isSaving = false;
            state.messagesaved = '',
            state.notes = [],
            state.active = DataEmpty;
        },
        deleteNoteById: (state, action: PayloadAction<string>) => {
            state.active = DataEmpty;
            state.notes = state.notes.filter((item) => (item.id !== action.payload));
        }
    }
});

export const { 
    savingNewNote, 
    addNewEmptyNote, 
    deleteNoteById, 
    setActiveNote, 
    setNotes, 
    setSaving, 
    updatedNote, 
    setPhotosToActiveNote,
    clearAllNotesLogout } = agendaSlice.actions;