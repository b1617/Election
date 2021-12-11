import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '../redux/slices/candidateSlice';
import contractReducer from '../redux/slices/contractSlice';
import userReducer from '../redux/slices/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        candidates: candidateReducer,
        contract: contractReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
