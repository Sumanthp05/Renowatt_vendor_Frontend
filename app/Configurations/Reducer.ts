import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '~/Features/Vendor/Reducers/SignUpReducer';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
    userData: userReducer
});

export default rootReducer;

// Export the RootState type
export type RootState = ReturnType<typeof rootReducer>;