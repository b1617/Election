import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IContract } from '../../interfaces/Contract';

const initialContract: IContract = {
    name: 'Election',
    methods: {},
};

export const contractSlice = createSlice({
    name: 'contract',
    initialState: initialContract,
    reducers: {
        setMethods: (state, action: PayloadAction<IContract>) => {
            return { ...state, methods: action.payload };
        },
    },
});

export const { setMethods } = contractSlice.actions;

export default contractSlice.reducer;
