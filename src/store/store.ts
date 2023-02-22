import { configureStore } from '@reduxjs/toolkit'
import { agendaSlice } from './agenda/agendaSlice'
import { authSlice } from './authSlice'

export const store = configureStore({
  reducer: {
      auth: authSlice.reducer,
      agenda: agendaSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch