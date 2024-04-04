import { configureStore } from '@reduxjs/toolkit'


import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import userSlice from './userSlice/userSlice';
import { userApi } from './api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({

  reducer: {
    // users: userSlice,
     [userApi.reducerPath]: userApi.reducer,
     },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(userApi.middleware),
    devTools:true
  
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);