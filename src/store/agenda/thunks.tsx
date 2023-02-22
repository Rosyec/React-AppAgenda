import { addDoc, collection, CollectionReference, deleteDoc, doc, getDocs, QuerySnapshot, setDoc } from "firebase/firestore";
import { addNewEmptyNote, deleteNoteById, Note, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updatedNote } from "./agendaSlice";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { FirebaseFirestore } from "../../firebase/config";
import { RootState } from "../../store/store";
import { fileUpload } from "../../agenda/helpers/fileUpload";

export const startNewNote = createAsyncThunk<void, void, { state: RootState }>('thunk/agenda/startNewNote',
    async (_, thunkApi) => {
        try {
            thunkApi.dispatch(savingNewNote());
            const { auth } = thunkApi.getState();
            const newNote: Note = {
                title: '',
                body: '',
                date: new Date().getTime(),
                imageUrls: []
            }
            const newDoc = await addDoc(collection(FirebaseFirestore, `${auth.uid}/agenda/notes`), newNote);
            newNote.id = newDoc.id;
            thunkApi.dispatch(addNewEmptyNote(newNote));
            thunkApi.dispatch(setActiveNote(newNote));

        } catch (error) {
            console.log(error);
        }
    });

export const startLoadingNotes = createAsyncThunk<void, void, { state: RootState }>('thunk/agenda/startLoadingNotes',
    async (_, thunkApi) => {
        try {
            const { auth } = thunkApi.getState();
            const getNotes = await getDocs(collection(FirebaseFirestore, `${auth.uid}/agenda/notes`)) as QuerySnapshot<Note>;
            let notas: Note[] = [];
            getNotes.forEach((item) => {
                notas.push({ ...item.data(), id: item.id });
            });
            thunkApi.dispatch(setNotes(notas));
        } catch (error) {
            console.log(error);
        }
    });

export const saveNote = createAsyncThunk<void, void, { state: RootState }>('thunk/agenda/saveUpdatedNote',
    async (_, thunkApi) => {
        try {
            thunkApi.dispatch( setSaving() );
            const { uid } = thunkApi.getState().auth;
            const { active } = thunkApi.getState().agenda;
            const noteToSend: Note = { ...active! };
            delete noteToSend.id;
            await setDoc( doc( FirebaseFirestore, `${uid}/agenda/notes/${active?.id}`), noteToSend, { merge: true });
            thunkApi.dispatch( updatedNote(active!) );
        } catch (error) {
            console.log(error)
        }
    });

    export const startUploadingFiles = createAsyncThunk<void, FileList, { state: RootState }>('thunk/agenda/uploadFiles',
    async ( files, thunkApi) => {
        try {
            thunkApi.dispatch( setSaving() );
            const response = await fileUpload( files );
            thunkApi.dispatch( setPhotosToActiveNote(response) );
        } catch (error) {
            console.log(error)
        }
    });

    export const deleteActiveNote = createAsyncThunk<void, void, { state: RootState }>('thunk/agenda/deleteActiveNote',
    async ( _ , thunkApi) => {
        try {
            const { agenda, auth } = thunkApi.getState();
            const { uid } = auth;
            const { id: nota } = agenda.active;
            await deleteDoc( doc( FirebaseFirestore, `${uid}/agenda/notes/${nota}` ) );
            thunkApi.dispatch( deleteNoteById(nota!) );
        } catch (error) {
            console.log(error)
        }
    });

export { }