import type { VendorData } from "./VendorData";

export interface VendorState {
  vendorData: VendorData | null;
  registrationLoading: boolean;
  registrationError: string | null;
  registrationSuccessful: boolean;
}