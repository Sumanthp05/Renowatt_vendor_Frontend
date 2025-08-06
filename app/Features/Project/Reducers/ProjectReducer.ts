import { createSlice } from '@reduxjs/toolkit';
import { createProject } from "../Actions/ProjectCreationAction";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProjectState } from '../Interface/ProjectState';

const initialState: ProjectState = {
  projectData: null,
  createProjectLoading: false,
  createProjectError: null,
  projectCreated: false,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    clearProjectError: (state) => {
      state.createProjectError = null;
    },
    resetProjectState: (state) => {
      state.projectData = null;
      state.createProjectLoading = false;
      state.createProjectError = null;
      state.projectCreated = false;
    },
  },
  extraReducers: (builder) => {
    // Create Project
    builder
      .addCase(createProject.pending, (state) => {
        console.log('Creating project...');
        state.createProjectLoading = true;
        state.createProjectError = null;
        state.projectCreated = false;
      })
      .addCase(createProject.fulfilled, (state, action: PayloadAction<any>) => {
        console.log('Project created successfully:', action.payload);
        state.createProjectLoading = false;
        state.projectCreated = true;
        state.projectData = action.payload;
        state.createProjectError = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        console.log('Project creation rejected:', action);
        state.createProjectLoading = false;
        state.createProjectError = action.payload as string;
        state.projectCreated = false;
      })
  }
});

export const { clearProjectError, resetProjectState } = projectSlice.actions;

export default projectSlice.reducer;
