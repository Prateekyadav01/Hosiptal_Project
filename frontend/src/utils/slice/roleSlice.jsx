import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
    name: 'role',
    initialState: {
        
    },
    reducers: {
       getValue:(state,action)=>{
        state.role = action.payload;
       }
    }
});

export const { getValue  } = roleSlice.actions;

export default roleSlice.reducer;