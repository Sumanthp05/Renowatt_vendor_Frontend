import { useState } from "react";
import { TextField, Box } from "@mui/material";
import Button from "~/Features/Vendor/Components/button";
import { useAppDispatch, useAppSelector } from "~/Configurations/Store";
import { registerVendor } from "../Features/Vendor/Actions/VendorSignUpAction";

const Register = () => {
    const dispatch = useAppDispatch();
    const { registrationLoading, registrationError } = useAppSelector(state => state.userData);
    
    const [formData, setFormData] = useState({
        emailId: "",
        password: "",
        vendorFirstName: "",
        vendorLastName: "",
        companyName: "",
        CIN: "",
        registrationNumber: "",
        dateOfIncorporation: "",
        userEmailId: "",
        userFirstName: "",
        userLastName: "",
        employeeId: "",
        designation: ""
    });

    const onEmailIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, emailId: event.target.value });
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, password: event.target.value });
    };

    const onVendorFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, vendorFirstName: event.target.value });
    };

    const onVendorLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, vendorLastName: event.target.value });
    };

    const onCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, companyName: event.target.value });
    };

    const onCINChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, CIN: event.target.value });
    };

    const onRegistrationNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, registrationNumber: event.target.value });
    };

    const onDateOfIncorporationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, dateOfIncorporation: event.target.value });
    };

    const onUserEmailIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, userEmailId: event.target.value });
    };

    const onUserFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, userFirstName: event.target.value });
    };

    const onUserLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, userLastName: event.target.value });
    };

    const onEmployeeIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, employeeId: event.target.value });
    };

    const onDesignationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, designation: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        console.log('--- submit called with data:', formData);
        event.preventDefault();
        
        // Convert registrationNumber and employeeId to numbers
        const submitData = {
            ...formData,
            registrationNumber: parseInt(formData.registrationNumber),
            employeeId: parseInt(formData.employeeId)
        };
        
        dispatch(registerVendor(submitData));
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-md space-y-4 bg-white p-8 rounded-lg shadow-lg border">
                <h1 className="text-2xl font-bold text-center text-gray-800">Register Page</h1>
                <p className="text-center text-gray-600">Please fill in the form to register.</p>
                
                {registrationError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {registrationError}
                    </div>
                )}
                
                <Box 
                    component="form" 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 2 
                    }} 
                    onSubmit={handleSubmit}
                >
                    <TextField 
                        id="emailId" 
                        name="emailId"
                        label="Email ID" 
                        type="email"
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.emailId}
                        onChange={onEmailIdChange}
                        disabled={registrationLoading}
                    />

                    <TextField 
                        id="password" 
                        name="password"
                        label="Password" 
                        type="password"
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.password}
                        onChange={onPasswordChange}
                        disabled={registrationLoading}
                    />

                    <TextField 
                        id="vendorFirstName" 
                        name="vendorFirstName"
                        label="Vendor First Name" 
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.vendorFirstName}
                        onChange={onVendorFirstNameChange}
                        disabled={registrationLoading}
                    />

                    <TextField 
                        id="vendorLastName" 
                        name="vendorLastName"
                        label="Vendor Last Name" 
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.vendorLastName}
                        onChange={onVendorLastNameChange}
                        disabled={registrationLoading}
                    />

                    <TextField 
                        id="companyName" 
                        name="companyName"
                        label="Company Name" 
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.companyName}
                        onChange={onCompanyNameChange}
                        disabled={registrationLoading}
                    />
                    
                    <TextField 
                        id="CIN" 
                        name="CIN"
                        label="CIN" 
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.CIN}
                        onChange={onCINChange}
                        disabled={registrationLoading}
                    />
                    
                    <TextField 
                        id="registrationNumber" 
                        name="registrationNumber"
                        label="Registration Number" 
                        type="number"
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.registrationNumber}
                        onChange={onRegistrationNumberChange}
                        disabled={registrationLoading}
                    />
                    
                    <TextField 
                        id="dateOfIncorporation" 
                        name="dateOfIncorporation"
                        label="Date of Incorporation" 
                        type="date"
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.dateOfIncorporation}
                        onChange={onDateOfIncorporationChange}
                        disabled={registrationLoading}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField 
                        id="userEmailId" 
                        name="userEmailId"
                        label="User Email ID" 
                        type="email"
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.userEmailId}
                        onChange={onUserEmailIdChange}
                        disabled={registrationLoading}
                    />

                    <TextField 
                        id="userFirstName" 
                        name="userFirstName"
                        label="User First Name" 
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.userFirstName}
                        onChange={onUserFirstNameChange}
                        disabled={registrationLoading}
                    />

                    <TextField 
                        id="userLastName" 
                        name="userLastName"
                        label="User Last Name" 
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.userLastName}
                        onChange={onUserLastNameChange}
                        disabled={registrationLoading}
                    />

                    <TextField 
                        id="employeeId" 
                        name="employeeId"
                        label="Employee ID" 
                        type="number"
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.employeeId}
                        onChange={onEmployeeIdChange}
                        disabled={registrationLoading}
                    />

                    <TextField 
                        id="designation" 
                        name="designation"
                        label="Designation" 
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.designation}
                        onChange={onDesignationChange}
                        disabled={registrationLoading}
                    />

                    <Box sx={{ pt: 2 }}>
                        <Button 
                            type="submit" 
                            disabled={registrationLoading}
                            name={registrationLoading ? "Registering..." : "Register"}
                        />
                    </Box>
                </Box>
                <p className="text-center text-sm text-gray-600">Already have an account? <a href="/login" className="text-green-600 hover:underline">Login here</a>.</p>
            </div>
        </div>
    );
};

export default Register;