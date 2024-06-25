import { createSlice } from "@reduxjs/toolkit";




const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        isLoggedIn: false,
        isAdmin: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isAdmin = action.payload.isAdmin;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.isAdmin = false;
        }
    }
})

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;