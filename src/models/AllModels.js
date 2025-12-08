// models.js
import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const Department = sequelize.define('Department', {
  department_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.TEXT,
  budget: DataTypes.DECIMAL(14,2)
}, { tableName: 'departments', timestamps: false });

const Employee = sequelize.define('Employee', {
  employee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  department_id: DataTypes.INTEGER,
  position: DataTypes.TEXT,
  salary: DataTypes.DECIMAL(12,2),
  performance_score: DataTypes.INTEGER,
  hire_date: DataTypes.DATEONLY,
  departure_date: DataTypes.DATEONLY
}, { tableName: 'employees', timestamps: false });

const EmployeeSalaryHistory = sequelize.define('EmployeeSalaryHistory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employee_id: DataTypes.INTEGER,
  salary: DataTypes.DECIMAL(12,2),
  date: DataTypes.DATEONLY
}, { tableName: 'employee_salary_history', timestamps: false });

const EmployeeDepartmentHistory = sequelize.define('EmployeeDepartmentHistory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employee_id: DataTypes.INTEGER,
  department_id: DataTypes.INTEGER,
  start_date: DataTypes.DATEONLY,
  end_date: DataTypes.DATEONLY
}, { tableName: 'employee_department_history', timestamps: false });

const EmployeeSkill = sequelize.define('EmployeeSkill', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employee_id: DataTypes.INTEGER,
  skill: DataTypes.TEXT
}, { tableName: 'employee_skills', timestamps: false });

const DepartmentRequiredSkill = sequelize.define('DepartmentRequiredSkill', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  department_id: DataTypes.INTEGER,
  skill: DataTypes.TEXT
}, { tableName: 'department_required_skills', timestamps: false });

const EmployeePromotionHistory = sequelize.define('EmployeePromotionHistory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employee_id: DataTypes.INTEGER,
  position: DataTypes.TEXT,
  change_date: DataTypes.DATEONLY
}, { tableName: 'employee_promotion_history', timestamps: false });

const Project = sequelize.define('Project', {
  project_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.TEXT,
  department_id: DataTypes.INTEGER
}, { tableName: 'projects', timestamps: false });

const ProjectAssignment = sequelize.define('ProjectAssignment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  project_id: DataTypes.INTEGER,
  employee_id: DataTypes.INTEGER
}, { tableName: 'project_assignments', timestamps: false });

export {
  Department, Employee, EmployeeSalaryHistory,
  EmployeeDepartmentHistory, EmployeeSkill,
  DepartmentRequiredSkill, EmployeePromotionHistory,
  Project, ProjectAssignment, sequelize
};
