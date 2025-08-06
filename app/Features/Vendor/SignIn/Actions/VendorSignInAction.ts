import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SignInData } from '../Interface/SignInData';
import { SIGN_IN_CONSTANT } from '../Constants/SignInActionConstants';
import { signInVendorAPI } from '../APIs/SignInApis';

export const signInVendor = createAsyncThunk(
  SIGN_IN_CONSTANT,
  async (signInData: SignInData, { rejectWithValue }) => {
    try {
      const data = await signInVendorAPI(signInData);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'SignIn failed');
    }
  }
);
