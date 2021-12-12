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
        updateCandidate: (state, action: PayloadAction<ICandidate>) => {
            state.splice(
                state.findIndex((candidate: ICandidate) => {
                    candidate.id === action.payload.id;
                }),
                1,
                action.payload
            );
            return state;
        },
    },
});

export const { setCandidates, addCandidate, updateCandidate } =
    candidateSlice.actions;

export default candidateSlice.reducer;
