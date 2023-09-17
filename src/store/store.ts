import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import sessionReducer from './session/sessionReducer'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
})

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch



