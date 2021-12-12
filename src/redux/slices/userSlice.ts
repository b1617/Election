import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../interfaces/User';

const initialUser: IUser = {
    account: null,
};

export const UserSlice = createSlice({
    name: 'user',
    initialState: initialUser,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
