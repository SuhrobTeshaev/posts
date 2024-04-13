import { configureStore } from '@reduxjs/toolkit'


import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './userSlice/authSlice';
import { postApi } from './api/apiSlice';

export const store = configureStore({

  reducer: {
     [postApi.reducerPath]: postApi.reducer,
     [userApi.reducerPath]:userApi.reducer
     },
    middleware: (getDefaultMiddleWare) => 
    getDefaultMiddleWare()
    
    .concat(postApi.middleware)
    .concat(userApi.middleware),
    
      
      

    devTools:true
  
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);