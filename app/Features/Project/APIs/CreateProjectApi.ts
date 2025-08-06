import httpHandler from '~/HttpHandler';
import { CREATE_PROJECT_API_ENDPOINT } from '../Constants/ApiConstant';
import type { ProjectData } from '../Interface/ProjectData';

// API function for project creation
export const createProjectAPI = async (projectData: ProjectData) => {
  try {
    // Get the auth token from localStorage
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    if (!authToken) {
      throw new Error('Authentication token not found. Please sign in again.');
    }

    console.log('=== Create Project API Call ===');
    console.log('Endpoint:', CREATE_PROJECT_API_ENDPOINT);
    console.log('Auth Token:', authToken ? 'Present' : 'Missing');
    console.log('Payload being sent:', JSON.stringify(projectData, null, 2));
    console.log('===============================');
    
    // Add auth token to headers
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    };
    
    const response = await httpHandler.post(CREATE_PROJECT_API_ENDPOINT, projectData, config);
    
    console.log('=== Create Project API Response ===');
    console.log('Response data:', response.data);
    console.log('===================================');
    
    // Return the response data
    return response.data;
  } catch (error: any) {
    console.error('Create project API error:', error);
    console.log('Error status:', error.response?.status);
    console.log('Error data:', error.response?.data);
    
    // Handle axios error format
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const responseData = error.response.data;
      
      console.log('API Error Details:', {
        status,
        statusText: error.response.statusText,
        data: responseData
      });
      
      let errorMessage;
      
      if (status === 401) {
        errorMessage = 'Authentication failed. Please sign in again.';
        // Clear invalid token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
        }
      } else if (status === 403) {
        errorMessage = responseData?.message || 'Access denied. You do not have permission to create projects.';
      } else if (status === 400) {
        errorMessage = responseData?.message || 'Invalid project data. Please check all fields and try again.';
      } else if (status === 422) {
        errorMessage = responseData?.message || 'Invalid input data. Please check your project information.';
      } else if (status === 500) {
        errorMessage = responseData?.message || 'Server error. Please try again later.';
      } else {
        errorMessage = responseData?.message || `Project creation failed with status: ${status}`;
      }
      
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: No response from server. Please check your internet connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'Project creation failed due to an unexpected error');
    }
  }
};
