import mongoose from "mongoose";

// Salary history
const salaryHistorySchema = new mongoose.Schema({
  salary: Number,
  date: { type: Date, default: Date.now }
});

// Promotion history
const promotionHistorySchema = new mongoose.Schema({
  position: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Department history
const departmentHistorySchema = new mongoose.Schema({
  department_id: { type: Number, required: true },
  start_date: { type: Date, default: Date.now },
  end_date: { type: Date }
});

const employeeSchema = new mongoose.Schema(
  {
    employee_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    
    department_id: { type: Number, required: true, min: 1, max: 4 },

    position: { type: String, required: true },
    salary: { type: Number, required: true, min: 30000 },

    skills: { type: [String], default: [] },

    performance_score: { type: Number, min: 1, max: 10, default: 0 },

    status: { type: String, enum: ["active", "inactive"], default: "active" },

    hire_date: { type: Date, default: Date.now },

    departure_date: { type: Date },

    promotion_history: [promotionHistorySchema],

    salary_history: [salaryHistorySchema],
    last_salary_review_date: { type: Date },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      }
    ],  

    department_history: [departmentHistorySchema]
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
