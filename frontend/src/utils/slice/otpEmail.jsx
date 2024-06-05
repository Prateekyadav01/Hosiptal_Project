import { createSlice } from '@reduxjs/toolkit';

const emailSLice = createSlice({
    name: 'email',
    initialState: {
        email:"",
    },
    reducers: {
       getEmail:(state,action)=>{
        state.email = action.payload;
       }
    }
});

export const { getEmail  } = emailSLice.actions;

export default emailSLice.reducer;