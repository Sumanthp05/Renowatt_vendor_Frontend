import { createSlice } from '@reduxjs/toolkit';
import { signInVendor } from "../Actions/VendorSignInAction";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SignInState } from '../Interface/SignInState';

const initialState: SignInState = {
  vendorData: null,
  signInLoading: false,
  signInError: null,
  isAuthenticated: false,
};

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    clearSignInError: (state) => {
      state.signInError = null;
    },
    resetSignInState: (state) => {
      state.vendorData = null;
      state.signInLoading = false;
      state.signInError = null;
      state.isAuthenticated = false;
    },
    signOut: (state) => {
      state.vendorData = null;
      state.isAuthenticated = false;
      state.signInError = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
      console.log('User signed out successfully');
    },
    initializeAuth: (state) => {
      // Initialize authentication state from localStorage
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken');
        if (token) {
          state.isAuthenticated = true;
          console.log('Authentication restored from localStorage');
        } else {
          state.isAuthenticated = false;
          console.log('No valid token found in localStorage');
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Sign In Vendor
    builder
      .addCase(signInVendor.pending, (state) => {
        console.log('Signing in vendor...');
        state.signInLoading = true;
        state.signInError = null;
      })
      .addCase(signInVendor.fulfilled, (state, action: PayloadAction<any>) => {
        console.log('Vendor signed in successfully:', action.payload);
        state.signInLoading = false;
        state.isAuthenticated = true;
        
        // Store auth token if provided
        if (action.payload.token && typeof window !== 'undefined') {
          localStorage.setItem('authToken', action.payload.token);
          console.log('SignIn: Auth token stored successfully');
        }
        
        // Store vendor data (could be in action.payload.vendor or action.payload directly)
        state.vendorData = action.payload.vendor || action.payload;
        state.signInError = null;
      })
      .addCase(signInVendor.rejected, (state, action) => {
        console.log('Vendor signin rejected:', action);
        state.signInLoading = false;
        state.signInError = action.payload as string;
        state.isAuthenticated = false;
      })
  }
});

export const { clearSignInError, resetSignInState, signOut, initializeAuth } = signInSlice.actions;

export default signInSlice.reducer;
