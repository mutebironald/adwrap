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
  selectedTab: 'static' | 'pole';
  expandedRow: string | null;
}

const initialState: MediaState = {
  items: [],
  loading: false,
  expandedRow: null,
  selectedTab: 'static'
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
        setSelectedTab: (state, action: PayloadAction<'static' | 'pole'>) => {
      state.selectedTab = action.payload;
    },
        toggleExpandedRow: (state, action: PayloadAction<string>) => {
      state.expandedRow = state.expandedRow === action.payload ? null : action.payload;
    },
  },
});

export const { setMedia, addMedia, setLoading, setSelectedTab, toggleExpandedRow } = mediaSlice.actions;
export default mediaSlice.reducer;
