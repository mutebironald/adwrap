import { configureStore } from '@reduxjs/toolkit';
import mediaReducer from '@/features/media/mediaSlice';
import { mediaApi } from './mediaApi';

export const store = configureStore({
  reducer: {
    media: mediaReducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mediaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
