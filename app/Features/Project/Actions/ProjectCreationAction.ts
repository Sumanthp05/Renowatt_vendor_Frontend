import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ProjectData } from '../Interface/ProjectData';
import { CREATE_PROJECT_CONSTANT } from '../Constants/ProjectActionConstants';
import { createProjectAPI } from '../APIs/CreateProjectApi';

export const createProject = createAsyncThunk(
  CREATE_PROJECT_CONSTANT,
  async (projectData: ProjectData, { rejectWithValue }) => {
    try {
      const data = await createProjectAPI(projectData);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Project creation failed');
    }
  }
);
