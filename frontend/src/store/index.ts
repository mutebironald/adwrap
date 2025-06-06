import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "@/features/media/mediaSlice";
import { mediaApi } from "./mediaApi";
import workspaceReducer from "./workspaceSlice";
import mediaFormReducer from "./mediaFormSlice";

export const store = configureStore({
  reducer: {
    media: mediaReducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
    workspace: workspaceReducer,
    mediaForm: mediaFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mediaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
