import { configureStore } from '@reduxjs/toolkit'
import { MonthlySlice } from '../Features/MonthlyReport/MonthlySlice'
export default configureStore({
  reducer: {
    Monthly: MonthlySlice.reducer,
  },
})