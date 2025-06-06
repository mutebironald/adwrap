import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  name: '',
  format: '',
  location: '',
  number_of_faces: '',
  landmark: '',
  availability: '',
  faces: [],
};

const mediaFormSlice = createSlice({
  name: 'mediaForm',
  initialState,
  reducers: {
    setMediaField: (state, action: PayloadAction<{ name: string; value: any }>) => {
      state[action.payload.name] = action.payload.value;
    },
    addFace: (state, action: PayloadAction<any>) => {
      state.faces.push(action.payload);
    },
  },
});

export const { setMediaField, addFace } = mediaFormSlice.actions;
export default mediaFormSlice.reducer;
