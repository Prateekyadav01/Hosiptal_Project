


import { configureStore } from '@reduxjs/toolkit'
import roleSlice from './slice/roleSlice'
import otpEmail from './slice/otpEmail'



const store = configureStore({
  reducer: {
   role:roleSlice,
   email:otpEmail
  },
})

export default store