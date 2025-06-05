// src/features/media/mediaSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MediaItem = {
  id: string;
  title: string;
  url: string;
};

interface MediaState {
  items: MediaItem[];
  loading: boolean;
}

const initialState: MediaState = {
  items: [],
  loading: false,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setMedia(state, action: PayloadAction<MediaItem[]>) {
      state.items = action.payload;
    },
    addMedia(state, action: PayloadAction<MediaItem>) {
      state.items.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setMedia, addMedia, setLoading } = mediaSlice.actions;
export default mediaSlice.reducer;
