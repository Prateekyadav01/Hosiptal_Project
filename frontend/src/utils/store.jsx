


import { configureStore } from '@reduxjs/toolkit'
import roleSlice from './slice/roleSlice'
import otpEmail from './slice/otpEmail'
import userSlice from './slice/userSlice'



const store = configureStore({
  reducer: {
   role:roleSlice,
   email:otpEmail,
   user:userSlice,
  },
})

export default store