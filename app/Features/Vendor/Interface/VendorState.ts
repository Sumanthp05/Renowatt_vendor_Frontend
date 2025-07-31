import type { VendorData } from "./VendorData";

export interface VendorState {
  vendorData: VendorData | null;
  registrationLoading: boolean;
  registrationError: string | null;
  vendors: VendorData[];
  fetchLoading: boolean;
  fetchError: string | null;
}