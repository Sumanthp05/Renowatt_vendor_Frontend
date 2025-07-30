import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerVendor = createAsyncThunk(
  'vendor/registerVendor',
  async (vendorData: VendorData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/vendor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      return data.vendor;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
  }
);
