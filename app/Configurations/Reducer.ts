import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '~/Features/Vendor/Reducers/SignUpReducer';
import signInReducer from '~/Features/Vendor/SignIn/Reducers/SignInReducer';
import projectReducer from '~/Features/Project/Reducers/ProjectReducer';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
    userData: userReducer,
    signInData: signInReducer,
    projectData: projectReducer
});

export default rootReducer;

// Export the RootState type
export type RootState = ReturnType<typeof rootReducer>;