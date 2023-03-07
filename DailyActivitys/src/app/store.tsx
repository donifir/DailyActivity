import { configureStore } from '@reduxjs/toolkit'
import authReducer from './../features/authSlice'
import pengingatReducer from './../features/pengingatSlide'
import kegiatanReducer from './../features/detailKegiatanSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pengingat: pengingatReducer,
    kegiatan: kegiatanReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch