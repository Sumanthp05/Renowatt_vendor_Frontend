export interface VendorData {
  emailId: string;           // Changed from 'email'
  password: string;
  vendorFirstName: string;
  vendorLastName: string;
  companyName: string;
  CIN: string;              // Changed from 'cin'
  registrationNumber: number; // Changed to number
  dateOfIncorporation: string;
  userEmailId: string;       // New field
  userFirstName: string;     // New field
  userLastName: string;      // New field
  employeeId: number;        // New field
  designation: string;       // New field
}