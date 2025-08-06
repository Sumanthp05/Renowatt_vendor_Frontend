import type { ProjectData } from './ProjectData';

// Interface for project state management
export interface ProjectState {
  projectData: ProjectData | null;
  createProjectLoading: boolean;
  createProjectError: string | null;
  projectCreated: boolean;
}
