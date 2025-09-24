import { configureStore } from '@reduxjs/toolkit'
import vitalsReducer from './vitalSlice'

export const store = configureStore({
  reducer: {
    vitals: vitalsReducer,
  },
})
