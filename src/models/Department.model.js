// models/Department.model.js
import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  department_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  budget: { type: Number, required: true }
});

export const Department = mongoose.model("Department", departmentSchema);


