  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

  export const fetchSalaryBand = createAsyncThunk(
    "employees/fetchSalaryChnage",
    async () => {
      const res = await fetch("http://localhost:5000/api/reports/salary-band");
      return res.json();
    }
  );

  export const fetchBonus = createAsyncThunk(
    "employees/fetchDepartures",
    async () => {
      const res = await fetch("http://localhost:5000/api/reports/bonus");
      return res.json();
    }
  );

  export const fetchPromotion = createAsyncThunk(
    "employees/SalaryChnages",
    async () => {
      const res = await fetch("http://localhost:5000/api/reports/promotion");
      return res.json();
    }
  );

  export const DepartmentSlice = createSlice({
    name: "Department",
    initialState: {
      salaryBand: [],
      Bonus: [],
      Promotion: [],
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchSalaryBand.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchSalaryBand.fulfilled, (state, action) => {
          state.loading = false;
          console.log("API Salary Band Response:", action.payload);
          state.salaryBand = action.payload.data || [];  
        })
        .addCase(fetchSalaryBand.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        });

      builder
        .addCase(fetchBonus.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchBonus.fulfilled, (state, action) => {
          state.loading = false;
          state.Bonus = action.payload || [];
        })
        .addCase(fetchBonus.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        });

      builder
        .addCase(fetchPromotion.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchPromotion.fulfilled, (state, action) => {
          state.loading = false;
          state.Promotion = action.payload || [];
        })
        .addCase(fetchPromotion.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        });
    },
  });
