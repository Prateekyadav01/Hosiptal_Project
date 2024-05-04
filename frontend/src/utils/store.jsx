


import { configureStore } from '@reduxjs/toolkit'
import roleSlice from './slice/roleSlice'



const store = configureStore({
  reducer: {
   role:roleSlice,
  },
})

export default store