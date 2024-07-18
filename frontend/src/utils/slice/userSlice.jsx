import { createSlice } from "@reduxjs/toolkit";

const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: userFromLocalStorage || null,
        isLoggedIn: !!userFromLocalStorage,
        isAdmin: userFromLocalStorage ? userFromLocalStorage.isAdmin : false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isAdmin = action.payload.isAdmin;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.isAdmin = false;
            localStorage.removeItem('user');
        }
    }
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
