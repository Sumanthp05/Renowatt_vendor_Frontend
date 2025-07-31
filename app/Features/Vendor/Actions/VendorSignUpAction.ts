import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { VendorData } from '../Interface/VendorData';
import { SIGN_UP_CONSTANT } from '../Constants/SignUpActionConstants';
import { registerVendorAPI } from '../APIs/SignUpApis';

export const registerVendor = createAsyncThunk(
  SIGN_UP_CONSTANT,
  async (vendorData: VendorData, { rejectWithValue }) => {
    try {
      const data = await registerVendorAPI(vendorData);
      return data.vendor || data; // Return vendor data from API response
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
  }
);
