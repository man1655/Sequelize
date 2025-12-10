import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSalaryBand = createAsyncThunk(
  "employees/commonSkill",
  async () => {
    const res = await fetch("http://localhost:5000/api/reports/commonSkill");
    return res.json();
  }
);


export const skillSlice = createSlice({
  name: "Skill",
  initialState: {
    salaryBand: [],
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
        state.salaryBand = action.payload.data || [];
      })
      .addCase(fetchSalaryBand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
