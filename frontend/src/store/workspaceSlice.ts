// store/slices/workspaceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkspaceState {
  businessName: string;
  email: string;
  location: string;
  id: string | null; // ID returned from API
}

const initialState: WorkspaceState = {
  businessName: '',
  email: '',
  location: '',
  id: null,
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspaceData(state, action: PayloadAction<Omit<WorkspaceState, 'id'>>) {
      const { businessName, email, location } = action.payload;
      state.businessName = businessName;
      state.email = email;
      state.location = location;
    },
    setWorkspaceId(state, action: PayloadAction<string>) {
      state.id = action.payload.id;
    },
    resetWorkspaceForm: () => initialState
  },
});

export const { setWorkspaceData, setWorkspaceId, resetWorkspaceForm } = workspaceSlice.actions;
export default workspaceSlice.reducer;
