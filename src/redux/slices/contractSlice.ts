import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const contractSlice = createSlice({
    name: 'contract',
    initialState: {
        methods: {},
    },
    reducers: {
        setMethods: (state, action: PayloadAction<any>) => {
            return { ...state, methods: action.payload };
        },
    },
});

export const { setMethods } = contractSlice.actions;

export default contractSlice.reducer;
