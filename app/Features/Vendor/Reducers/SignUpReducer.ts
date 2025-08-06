import { createSlice } from '@reduxjs/toolkit';
import { registerVendor } from "../Actions/VendorSignUpAction";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { VendorState } from '../Interface/VendorState';
import type { VendorData } from '../Interface/VendorData';

const initialState: VendorState = {
  vendorData: null,
  registrationLoading: false,
  registrationError: null,
  registrationSuccessful: false,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    clearVendorError: (state) => {
      state.registrationError = null;
    },
    resetVendorState: (state) => {
      state.vendorData = null;
      state.registrationLoading = false;
      state.registrationError = null;
      state.registrationSuccessful = false;
    },
    clearRegistrationSuccess: (state) => {
      state.registrationSuccessful = false;
    },
    updateLocalVendorData: (state, action: PayloadAction<Partial<VendorData>>) => {
      if (state.vendorData) {
        state.vendorData = { ...state.vendorData, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // Register Vendor
    builder
      .addCase(registerVendor.pending, (state) => {
        console.log('Registering vendor...');
        state.registrationLoading = true;
        state.registrationError = null;
        state.registrationSuccessful = false;
      })
      .addCase(registerVendor.fulfilled, (state, action: PayloadAction<any>) => {
        console.log('Vendor registered successfully:', action.payload);
        state.registrationLoading = false;
        state.registrationSuccessful = true;
        
        // Store vendor data (token is already stored in the API)
        state.vendorData = action.payload.vendor || action.payload;
        state.registrationError = null;
      })
      .addCase(registerVendor.rejected, (state, action) => {
        console.log('Vendor registration rejected:', action);
        state.registrationLoading = false;
        state.registrationError = action.payload as string;
        state.registrationSuccessful = false;
      })
  }
});

export const { clearVendorError, resetVendorState, updateLocalVendorData, clearRegistrationSuccess } = vendorSlice.actions;

export default vendorSlice.reducer;