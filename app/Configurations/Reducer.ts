import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../Reducers/userReducer';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
    userData: userReducer
//   vendor: vendorSlice,
});

export default rootReducer;

// Export the RootState type
export type RootState = ReturnType<typeof rootReducer>;