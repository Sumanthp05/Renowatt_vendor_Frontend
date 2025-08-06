// Interface for SignIn state management
export interface SignInState {
  vendorData: any | null;
  signInLoading: boolean;
  signInError: string | null;
  isAuthenticated: boolean;
}
