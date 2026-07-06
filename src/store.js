import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './redux/notebaseSlice'
export const store = configureStore({
  reducer: {
    notes:notesReducer,
  },
})