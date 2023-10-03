import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { galleryApi } from './api/galleryApi';
import authReducer from './slices/authSlice';
const reducer = combineReducers({
   auth: authReducer,
   [galleryApi.reducerPath]: galleryApi.reducer,
});

export const store = configureStore({
   reducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
         galleryApi.middleware,
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
