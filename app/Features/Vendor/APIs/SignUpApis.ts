import httpHandler from '~/HttpHandler';
import { SIGN_UP_API_ENDPOINT } from '../Constants/ApiConstant';
import type { VendorData } from '../Interface/VendorData';

// API function for vendor registration
export const registerVendorAPI = async (vendorData: VendorData) => {
  try {
    const response = await httpHandler.post(SIGN_UP_API_ENDPOINT, vendorData);
    
    // Return the response data
    return response.data;
  } catch (error: any) {
    console.error('Vendor registration API error:', error);
    
    // Handle axios error format
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || 
                          `Registration failed with status: ${error.response.status}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: No response from server');
    } else {
      // Something else happened
      throw new Error(error.message || 'Registration failed');
    }
  }
};