import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { TextField, Box, MenuItem, Chip, OutlinedInput } from '@mui/material';
import Button from "~/Features/Vendor/Components/button";
import { createProject } from '../Features/Project/Actions/ProjectCreationAction';
import type { RootState } from '~/Configurations/Store';
import type { ProjectData } from '../Features/Project/Interface/ProjectData';

const CreateProject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { createProjectLoading, createProjectError, projectCreated } = useSelector((state: RootState) => state.projectData);
    const { isAuthenticated } = useSelector((state: RootState) => state.signInData);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    
    const [formData, setFormData] = useState<Omit<ProjectData, 'authId' | 'vendor_id'>>({
        title: '',
        plantCapacity: '',
        estimatedCost: 0,
        duration: '',
        status: 'Pending',
        invertorBrand: '',
        panelBrand: '',
        subsidyAmount: '',
        invertorId: 0,
        plantHealthStatus: 'Good',
        location: '',
        serviceTypes: []
    });

    // Service types options
    const serviceTypeOptions = [
        'Installation',
        'Maintenance', 
        'Monitoring',
        'Repair',
        'Consultation',
        'Design'
    ];

    // Status options
    const statusOptions = [
        'Pending',
        'In Progress',
        'Completed',
        'On Hold'
    ];

    // Plant health status options
    const healthStatusOptions = [
        'Excellent',
        'Good',
        'Average',
        'Poor'
    ];

    // Check authentication on component mount - STRICT authentication check
    useEffect(() => {
        const checkAuth = async () => {
            const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
            
            // MUST have both Redux state AND localStorage token for access
            if (!authToken || !isAuthenticated) {
                console.log('Authentication failed - Token:', !!authToken, 'Redux Auth:', isAuthenticated);
                console.log('Redirecting to signin page...');
                navigate('/SignIn');
                return;
            }
            
            console.log('Authentication successful - User can access CreateProject page');
            setIsCheckingAuth(false);
        };
        
        // Add small delay to allow Redux state to initialize
        const timer = setTimeout(checkAuth, 100);
        return () => clearTimeout(timer);
    }, [isAuthenticated, navigate]);

    // Handle successful project creation
    useEffect(() => {
        if (projectCreated) {
            console.log('Project created successfully, redirecting to home page...');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [projectCreated, navigate]);

    const handleInputChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = field === 'estimatedCost' || field === 'invertorId' 
            ? Number(event.target.value) 
            : event.target.value;
        
        setFormData({ ...formData, [field]: value });
    };

    const handleServiceTypesChange = (event: any) => {
        const value = event.target.value;
        setFormData({ 
            ...formData, 
            serviceTypes: typeof value === 'string' ? value.split(',') : value 
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        // Basic validation
        if (!formData.title || !formData.plantCapacity || !formData.location) {
            alert('Please fill in all required fields (Title, Plant Capacity, Location)');
            return;
        }

        if (formData.estimatedCost <= 0) {
            alert('Please enter a valid estimated cost');
            return;
        }

        // Create project data with additional required fields
        const projectData: ProjectData = {
            ...formData,
            authId: 2043, // You might want to get this from user context
            vendor_id: 1   // You might want to get this from user context
        };

        dispatch(createProject(projectData) as any);
    };

    // Show loading while checking authentication
    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Checking authentication...</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-2xl space-y-4 bg-white p-8 rounded-lg shadow-lg border">
                <h1 className="text-2xl font-bold text-center text-gray-800">Create New Project</h1>
                <p className="text-center text-gray-600">Fill in the project details below.</p>
                
                {createProjectError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {createProjectError}
                    </div>
                )}
                
                {projectCreated && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        Project created successfully! Redirecting to home page...
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
                        id="title" 
                        name="title"
                        label="Project Title *" 
                        variant="filled" 
                        fullWidth
                        required
                        value={formData.title}
                        onChange={handleInputChange('title')}
                        disabled={createProjectLoading}
                    />

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField 
                            id="plantCapacity" 
                            name="plantCapacity"
                            label="Plant Capacity *" 
                            variant="filled" 
                            fullWidth
                            required
                            placeholder="e.g., 5kW"
                            value={formData.plantCapacity}
                            onChange={handleInputChange('plantCapacity')}
                            disabled={createProjectLoading}
                        />

                        <TextField 
                            id="estimatedCost" 
                            name="estimatedCost"
                            label="Estimated Cost (₹)" 
                            type="number"
                            variant="filled" 
                            fullWidth
                            required
                            value={formData.estimatedCost}
                            onChange={handleInputChange('estimatedCost')}
                            disabled={createProjectLoading}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField 
                            id="duration" 
                            name="duration"
                            label="Duration" 
                            variant="filled" 
                            fullWidth
                            placeholder="e.g., 30 days"
                            value={formData.duration}
                            onChange={handleInputChange('duration')}
                            disabled={createProjectLoading}
                        />

                        <TextField 
                            id="location" 
                            name="location"
                            label="Location *" 
                            variant="filled" 
                            fullWidth
                            required
                            value={formData.location}
                            onChange={handleInputChange('location')}
                            disabled={createProjectLoading}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField 
                            id="status"
                            name="status"
                            select
                            label="Status"
                            variant="filled" 
                            fullWidth
                            value={formData.status}
                            onChange={handleInputChange('status')}
                            disabled={createProjectLoading}
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField 
                            id="plantHealthStatus"
                            name="plantHealthStatus"
                            select
                            label="Plant Health Status"
                            variant="filled" 
                            fullWidth
                            value={formData.plantHealthStatus}
                            onChange={handleInputChange('plantHealthStatus')}
                            disabled={createProjectLoading}
                        >
                            {healthStatusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField 
                            id="invertorBrand" 
                            name="invertorBrand"
                            label="Invertor Brand" 
                            variant="filled" 
                            fullWidth
                            value={formData.invertorBrand}
                            onChange={handleInputChange('invertorBrand')}
                            disabled={createProjectLoading}
                        />

                        <TextField 
                            id="panelBrand" 
                            name="panelBrand"
                            label="Panel Brand" 
                            variant="filled" 
                            fullWidth
                            value={formData.panelBrand}
                            onChange={handleInputChange('panelBrand')}
                            disabled={createProjectLoading}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField 
                            id="subsidyAmount" 
                            name="subsidyAmount"
                            label="Subsidy Amount" 
                            variant="filled" 
                            fullWidth
                            placeholder="e.g., 10000"
                            value={formData.subsidyAmount}
                            onChange={handleInputChange('subsidyAmount')}
                            disabled={createProjectLoading}
                        />

                        <TextField 
                            id="invertorId" 
                            name="invertorId"
                            label="Invertor ID" 
                            type="number"
                            variant="filled" 
                            fullWidth
                            value={formData.invertorId}
                            onChange={handleInputChange('invertorId')}
                            disabled={createProjectLoading}
                        />
                    </Box>

                    <TextField
                        id="serviceTypes"
                        name="serviceTypes"
                        select
                        label="Service Types"
                        variant="filled"
                        fullWidth
                        value={formData.serviceTypes}
                        onChange={handleServiceTypesChange}
                        disabled={createProjectLoading}
                        SelectProps={{
                            multiple: true,
                            input: <OutlinedInput />,
                            renderValue: (selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {(selected as string[]).map((value) => (
                                        <Chip key={value} label={value} size="small" />
                                    ))}
                                </Box>
                            ),
                        }}
                    >
                        {serviceTypeOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ pt: 2 }}>
                        <Button 
                            type="submit" 
                            disabled={createProjectLoading}
                            name={createProjectLoading ? "Creating Project..." : "Create Project"}
                        />
                    </Box>
                </Box>
                
                <p className="text-center text-sm text-gray-600">
                    <a href="/" className="text-green-600 hover:underline">Back to Home</a>
                </p>
            </div>
        </div>
    );
};

export default CreateProject;
