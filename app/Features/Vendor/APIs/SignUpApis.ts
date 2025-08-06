import httpHandler from '~/HttpHandler';
import { SIGN_UP_API_ENDPOINT } from '../Constants/ApiConstant';
import type { VendorData } from '../Interface/VendorData';

// API function for vendor registration
export const registerVendorAPI = async (vendorData: VendorData) => {
  try {
    const response = await httpHandler.post(SIGN_UP_API_ENDPOINT, vendorData);
    
    // Store auth token if provided in response
    const token = response.data.token || response.data.authToken;
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      console.log('SignUp: Auth token stored successfully');
      console.log('Token value:', token);
    } else {
      console.warn('SignUp: No token found in response or localStorage not available');
      console.log('Response structure:', Object.keys(response.data));
    }
    
    // Return the response data
    return response.data;
  } catch (error: any) {
    console.error('Vendor registration API error:', error);
    console.log('Error status:', error.response?.status);
    console.log('Error data:', error.response?.data);
    
    // Handle axios error format
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const responseData = error.response.data;
      
      console.log('SignUp API Error Details:', {
        status,
        statusText: error.response.statusText,
        data: responseData
      });
      
      let errorMessage;
      
      if (status === 400) {
        errorMessage = responseData?.message || 'Invalid registration data. Please check all fields.';
      } else if (status === 409) {
        errorMessage = responseData?.message || 'User already exists with this email address.';
      } else if (status === 422) {
        errorMessage = responseData?.message || 'Invalid input data. Please check your information and try again.';
      } else {
        errorMessage = responseData?.message || `Registration failed with status: ${status}`;
      }
      
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: No response from server. Please check your internet connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'Registration failed due to an unexpected error');
    }
  }
};