// Interface for SignIn request data
export interface SignInData {
  emailId: string;
  password: string;
}

// Interface for SignIn response data
export interface SignInResponse {
  token: string;
  vendor?: any;
  message?: string;
}

// Interface for SignIn API request
export interface SignInRequest {
  emailId: string;
  password: string;
}
