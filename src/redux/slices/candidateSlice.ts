import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICandidate } from '../../interfaces/Candidate';

export const candidateSlice = createSlice({
    name: 'candidates',
    initialState: [] as ICandidate[],
    reducers: {
        setCandidates: (state, action: PayloadAction<ICandidate[]>) => {
            return [...action.payload];
        },
        addCandidate: (state, action: PayloadAction<ICandidate>) => {
            return [...state, action.payload];
        },
    },
});

export const { setCandidates, addCandidate } = candidateSlice.actions;

export default candidateSlice.reducer;
