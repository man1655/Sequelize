import {
  Department,
  Employee,
  EmployeeSalaryHistory,
  EmployeeDepartmentHistory,
  EmployeeSkill,
  DepartmentRequiredSkill,
  EmployeePromotionHistory,
  Project,
  ProjectAssignment
} from './AllModels.js'

// ------------------
// DEPARTMENT ↔ EMPLOYEE
// ------------------
Department.hasMany(Employee, {
  foreignKey: 'department_id'
});
Employee.belongsTo(Department, {
  foreignKey: 'department_id'
});

// ------------------
// EMPLOYEE ↔ SALARY HISTORY
// ------------------
Employee.hasMany(EmployeeSalaryHistory, {
  foreignKey: 'employee_id'
});
EmployeeSalaryHistory.belongsTo(Employee, {
  foreignKey: 'employee_id'
});

// ------------------
// EMPLOYEE ↔ DEPARTMENT HISTORY
// ------------------
Employee.hasMany(EmployeeDepartmentHistory, {
  foreignKey: 'employee_id'
});
EmployeeDepartmentHistory.belongsTo(Employee, {
  foreignKey: 'employee_id'
});

Department.hasMany(EmployeeDepartmentHistory, {
  foreignKey: 'department_id'
});
EmployeeDepartmentHistory.belongsTo(Department, {
  foreignKey: 'department_id'
});

// ------------------
// EMPLOYEE ↔ SKILLS (One-to-Many)
// ------------------
Employee.hasMany(EmployeeSkill, {
  foreignKey: 'employee_id'
});
EmployeeSkill.belongsTo(Employee, {
  foreignKey: 'employee_id'
});

// ------------------
// DEPARTMENT REQUIRED SKILLS (One-to-Many)
// ------------------
Department.hasMany(DepartmentRequiredSkill, {
  foreignKey: 'department_id'
});
DepartmentRequiredSkill.belongsTo(Department, {
  foreignKey: 'department_id'
});

// ------------------
// EMPLOYEE ↔ PROMOTION HISTORY
// ------------------
Employee.hasMany(EmployeePromotionHistory, {
  foreignKey: 'employee_id'
});
EmployeePromotionHistory.belongsTo(Employee, {
  foreignKey: 'employee_id'
});

// ------------------
// PROJECT ↔ DEPARTMENT
// ------------------
Department.hasMany(Project, {
  foreignKey: 'department_id'
});
Project.belongsTo(Department, {
  foreignKey: 'department_id'
});

// ------------------
// EMPLOYEE ↔ PROJECTS (Many-to-Many)
// Through: project_assignments
// ------------------
Employee.belongsToMany(Project, {
  through: ProjectAssignment,
  foreignKey: 'employee_id'
});
Project.belongsToMany(Employee, {
  through: ProjectAssignment,
  foreignKey: 'project_id'
});
export {
  Department,
  Employee,
  EmployeeSalaryHistory,
  EmployeeDepartmentHistory,
  EmployeeSkill,
  DepartmentRequiredSkill,
  EmployeePromotionHistory,
  Project,
  ProjectAssignment
};
