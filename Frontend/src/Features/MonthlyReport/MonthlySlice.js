import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const fetchNewHires=createAsyncThunk('employees/fetchNewHires',
  async () => {
    const res=await fetch('http://localhost:5000/api/reports/new-hires')
    return res.json();
  }
)


export const fetchDepartures=createAsyncThunk('employees/fetchDepartures',
  async()=>{
    const res=await fetch('http://localhost:5000/api/reports/departures')
    return res.json();
  }
)



export const fetchSalaryChnages=createAsyncThunk('employees/SalaryChnages',
  async()=>{
    const res=await fetch('http://localhost:5000/api/reports/salary-changes')
    return res.json();
  }
)

export const DepartmentChnages=createAsyncThunk('employees/DepartmentChnages',
  async()=>{
    const res=await fetch('http://localhost:5000/api/reports/department-changes')
    return res.json();
  }
)


export const MonthlySlice=createSlice({
  name:"Monthly",
  initialState:{
    newHires:[],
    departures:[],
    salaryChange:[],
    deptChnage:[],
    loading:false,
    error:null,
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchNewHires.pending,(state)=>{
      state.loading=true;
    })
    .addCase(fetchNewHires.fulfilled,(state,action)=>{
      state.loading=false;
      state.newHires=action.payload?.data?.data ||[];
    })
    .addCase(fetchNewHires.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error
    })



     builder.addCase(fetchDepartures.pending,(state)=>{
      state.loading=true;
    })
    .addCase(fetchDepartures.fulfilled,(state,action)=>{
      state.loading=false;
      state.departures=action.payload?.data?.data ||[];
    })
    .addCase(fetchDepartures.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error
    })

    builder.addCase(fetchSalaryChnages.pending,(state)=>{
      state.loading=true;
    })
    .addCase(fetchSalaryChnages.fulfilled,(state,action)=>{
      state.loading=false;
      state.salaryChange=action.payload?.data ||[];
    })
    .addCase(fetchSalaryChnages.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error
    })

     builder.addCase(DepartmentChnages.pending,(state)=>{
      state.loading=true;
    })
    .addCase(DepartmentChnages.fulfilled,(state,action)=>{
      state.loading=false;
      state.deptChnage=action.payload?.data ||[];
    })
    .addCase(DepartmentChnages.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error
    })

  }
})