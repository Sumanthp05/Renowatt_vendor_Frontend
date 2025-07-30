import { useState } from "react";
import { TextField, Box } from "@mui/material";
import Button from "~/Features/Vendor/Components/button";
import { useAppDispatch, useAppSelector } from "~/Configurations/Store";
import { registerVendor } from "../Features/Vendor/Actions/VendorSignUpAction";

const Register = () => {
    const dispatch = useAppDispatch();
    const { registrationLoading, registrationError } = useAppSelector(state => state.userData);
    
    const [formData, setFormData] = useState({
        vendorFirstName: "",
        vendorLastName: "",
        email: "",
        password: "",
        companyName: "",
        cin: "",
        registrationNumber: "",
        dateOfIncorporation: ""
    });

    const onVendorFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, vendorFirstName: event.target.value });
    };

    const onVendorLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, vendorLastName: event.target.value });
    };

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, email: event.target.value });
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, password: event.target.value });
    };

    const onCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, companyName: event.target.value });
    };

    const onCinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, cin: event.target.value });
    };

    const onRegistrationNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, registrationNumber: event.target.value });
    };

    const onDateOfIncorporationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, dateOfIncorporation: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(registerVendor(formData));
    };

    // console.log('------ rendering ---- ', formData);

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
                        id="email" 
                        name="email"
                        label="Email" 
                        type="email"
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.email}
                        onChange={onEmailChange}
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
                        id="cin" 
                        name="cin"
                        label="CIN" 
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.cin}
                        onChange={onCinChange}
                        disabled={registrationLoading}
                    />
                    
                    <TextField 
                        id="registrationNumber" 
                        name="registrationNumber"
                        label="Registration Number" 
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