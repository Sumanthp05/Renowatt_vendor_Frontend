import httpHandler from '~/HttpHandler';
import { SIGN_IN_API_ENDPOINT } from '../Constants/ApiConstant';
import type { SignInData } from '../Interface/SignInData';

// API function for vendor signin
export const signInVendorAPI = async (signInData: SignInData) => {
  try {
    console.log('=== SignIn API Call ===');
    console.log('Endpoint:', SIGN_IN_API_ENDPOINT);
    console.log('Payload being sent:', JSON.stringify(signInData, null, 2));
    console.log('Payload keys:', Object.keys(signInData));
    console.log('========================');
    
    const response = await httpHandler.post(SIGN_IN_API_ENDPOINT, signInData);
    
    console.log('=== SignIn API Response ===');
    console.log('Response data:', response.data);
    console.log('============================');
    
    // Store auth token if provided in response
    const token = response.data.token || response.data.authToken;
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      console.log('SignIn: Auth token stored successfully');
      console.log('Token value:', token);
    } else {
      console.warn('SignIn: No token found in response or localStorage not available');
      console.log('Response structure:', Object.keys(response.data));
      console.log('Available fields:', response.data);
    }
    
    // Return the response data
    return response.data;
  } catch (error: any) {
    console.error('Vendor signin API error:', error);
    console.log('Error status:', error.response?.status);
    console.log('Error data:', error.response?.data);
    
    // Do not generate mock tokens - always fail properly for better security
    // Mock tokens were causing security issues where wrong credentials would still log users in
    
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
        errorMessage = responseData?.message || 'Invalid email or password. Please check your credentials and try again.';
      } else if (status === 403) {
        errorMessage = responseData?.message || 'Access denied. Please check your credentials.';
      } else if (status === 404) {
        errorMessage = responseData?.message || 'User not found. Please check your email address.';
      } else if (status === 422) {
        errorMessage = responseData?.message || 'Invalid input data. Please check your email and password format.';
      } else {
        errorMessage = responseData?.message || `SignIn failed with status: ${status}`;
      }
      
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: No response from server. Please check your internet connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'SignIn failed due to an unexpected error');
    }
  }
};
