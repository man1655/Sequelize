import { configureStore } from '@reduxjs/toolkit'
import { MonthlySlice } from '../Features/MonthlyReport/MonthlySlice'
import { DepartmentSlice } from '../Features/SkillInventory/DepartmentSlice'
import { skillSlice } from '../Features/Department/skillInventorySlice'
export default configureStore({
  reducer: {
    Monthly: MonthlySlice.reducer,
    Department:DepartmentSlice.reducer,
    Skill:skillSlice.reducer,
    
  },
})