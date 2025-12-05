// models/Project.model.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    project_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    department_id: { type: Number, required: true },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
      }
    ],
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
