import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { TextField, Box } from '@mui/material';
import Button from "~/Features/Vendor/Components/button";
import { signInVendor } from '../Features/Vendor/SignIn/Actions/VendorSignInAction';
import { signOut } from '../Features/Vendor/SignIn/Reducers/SignInReducer';
import type { RootState } from '~/Configurations/Store';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signInLoading, signInError, isAuthenticated } = useSelector((state: RootState) => state.signInData);
    const previousSignInLoading = useRef(false);
    const [hasJustSignedIn, setHasJustSignedIn] = useState(false);
    
    const [formData, setFormData] = useState({
        emailId: '',
        password: ''
    });

    // Redirect to home only after NEW successful signin (not existing authentication)
    useEffect(() => {
        // Only redirect if we just completed a signin (loading changed from true to false with success)
        if (previousSignInLoading.current && !signInLoading && isAuthenticated && localStorage.getItem('authToken')) {
            console.log('SignIn successful, redirecting to home page...');
            setHasJustSignedIn(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        previousSignInLoading.current = signInLoading;
    }, [signInLoading, isAuthenticated, navigate]);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, emailId: event.target.value });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, password: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!formData.emailId || !formData.password) {
            alert('Please fill in all required fields');
            return;
        }

        dispatch(signInVendor(formData) as any);
    };

    const handleSignOut = () => {
        dispatch(signOut());
        setHasJustSignedIn(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-md space-y-4 bg-white p-8 rounded-lg shadow-lg border">
                <h1 className="text-2xl font-bold text-center text-gray-800">Sign In</h1>
                <p className="text-center text-gray-600">Please sign in to your account.</p>
                
                {/* Show if user is already authenticated (but not during a signin process) */}
                {isAuthenticated && !signInLoading && !hasJustSignedIn && (
                    <div className="space-y-3">
                        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                            You are already signed in!
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                name="Go to Home"
                                onClick={() => navigate('/')}
                            />
                            <button
                                onClick={handleSignOut}
                                className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
                
                {signInError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {signInError}
                    </div>
                )}
                
                {/* Show success message only for new signin */}
                {hasJustSignedIn && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        Sign in successful! Redirecting to home page...
                    </div>
                )}
                
                {/* Only show the form if not already authenticated or if there's an error */}
                {(!isAuthenticated || signInError) && !hasJustSignedIn && (
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
                        onChange={handleEmailChange}
                        disabled={signInLoading}
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
                        onChange={handlePasswordChange}
                        disabled={signInLoading}
                    />

                    <Box sx={{ pt: 2 }}>
                        <Button 
                            type="submit" 
                            disabled={signInLoading}
                            name={signInLoading ? "Signing In..." : "Sign In"}
                        />
                    </Box>
                    </Box>
                )}
                
                {/* Only show signup link if not already authenticated */}
                {(!isAuthenticated || signInError) && !hasJustSignedIn && (
                    <p className="text-center text-sm text-gray-600">Don't have an account? <a href="/SignUp" className="text-green-600 hover:underline">Register here</a>.</p>
                )}
            </div>
        </div>
    );
};

export default SignIn;
