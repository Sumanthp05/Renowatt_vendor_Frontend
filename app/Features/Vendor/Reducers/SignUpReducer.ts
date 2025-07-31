import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerVendor } from "../Actions/VendorSignUpAction";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { VendorState } from '../Interface/VendorState';
import type { VendorData } from '../Interface/VendorData';

const initialState: VendorState = {
  vendorData: null,
  registrationLoading: false,
  registrationError: null,
  vendors: [],
  fetchLoading: false,
  fetchError: null,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    clearVendorError: (state) => {
      state.registrationError = null;
      state.fetchError = null;
    },
    resetVendorState: (state) => {
      state.vendorData = null;
      state.registrationLoading = false;
      state.registrationError = null;
      state.fetchLoading = false;
      state.fetchError = null;
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
      })
      .addCase(registerVendor.fulfilled, (state, action: PayloadAction<VendorData>) => {
        console.log('Vendor registered successfully:', action);
        state.registrationLoading = false;
        state.vendorData = action.payload;
        state.vendors.push(action.payload);
        state.registrationError = null;
      })
      .addCase(registerVendor.rejected, (state, action) => {
        console.log('Vendor registration rejected:', action);
        state.registrationLoading = false;
        state.registrationError = action.payload as string;
      })
  }
});

export const { clearVendorError, resetVendorState, updateLocalVendorData } = vendorSlice.actions;

export default vendorSlice.reducer;