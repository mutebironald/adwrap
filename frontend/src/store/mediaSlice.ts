import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MediaState {
  selectedTab: 'static' | 'pole';
  expandedRow: string | null;
}

const initialState: MediaState = {
  selectedTab: 'static',
  expandedRow: null,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<'static' | 'pole'>) => {
      state.selectedTab = action.payload;
    },
    toggleExpandedRow: (state, action: PayloadAction<string>) => {
      state.expandedRow = state.expandedRow === action.payload ? null : action.payload;
    },
  },
});

export const { setSelectedTab, toggleExpandedRow } = mediaSlice.actions;
export default mediaSlice.reducer;
