// import { Employee } from "../models/Employee.model.js";
import { Op, where } from "sequelize";
import { Department, Employee, Project, sequelize,DepartmentRequiredSkill,EmployeeSkill} from "../models/AllModels.js";

export const getDepartmentReport = async () => {
  try {
    const data = await Department.findAll({
      attributes: [
        'department_id',
        'name',

        [
          sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('Employees.employee_id'))),
          'Employees'
        ],

        [
          sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('Projects.project_id'))),
          'Projects'
        ]
      ],

      include: [
        {
          model: Employee,
          attributes: [],
          required: false
        },
        {
          model: Project,
          attributes: [],
          required: false
        }
      ],

      group: ['Department.department_id'],
      raw: true
    });

    return data;

  } catch (err) {
    console.error("getDepartmentReport Error:", err);
    return [];
  }
};
export const skillsGapAnalysis = async () => {
  
  return await DepartmentRequiredSkill.findAll({
    attributes: [
      'department_id',
      'skill',
      [sequelize.literal(`
        (
          SELECT STRING_AGG(e.name, ', ')
          FROM employee_skills es
          INNER JOIN employees e ON es.employee_id = e.employee_id
          WHERE es.skill = "DepartmentRequiredSkill".skill
          AND e.department_id != "DepartmentRequiredSkill".department_id
        )
      `), 'employees_in_other_departments']
    ],
    include: [
      {
        model: Department,
        attributes: ['name']
      }
    ],
    raw: true
  });
};

// 2.3 Salary Equity Analysis

export const salaryEquityAnalysis = async () => {
  return await Employee.findAll({
    attributes:[
      'position',
      [sequelize.fn('COUNT', sequelize.col('employee_id')), 'Employee_Count'],
      [sequelize.fn('AVG', sequelize.col('salary')), 'Average_Salary'],
      [sequelize.fn('SUM', sequelize.col('salary')), 'Total_Salary'],
      [sequelize.fn('MIN', sequelize.col('salary')), 'Min_Salary'],
      [sequelize.fn('MAX', sequelize.col('salary')), 'Max_Salary'],
      [sequelize.literal(`MAX(salary) - MIN(salary)`), 'Salary_Gap']
    ],
    group: ['position'],
    order: [['position', 'ASC']]
  });
};

export const employeeRetentionRisk = async () => {
  try {
    const data = await Employee.findAll({
      attributes: [
        "employee_id",
        "name",
        "position",
        "salary",
        [
          sequelize.literal(`(
            SELECT AVG(e2.salary)
            FROM employees AS e2
            WHERE e2.position = "Employee".position
          )`),
          "avg_salary_position"
        ]
      ],
      where: sequelize.literal(`salary < (
        SELECT AVG(e2.salary)
        FROM employees AS e2
        WHERE e2.position = "Employee".position
      )`),
      order: [["salary", "ASC"]],
      raw: true
    });

    return data;
  } catch (err) {
    console.error("Employee Retention Risk Error:", err);
    return [];
  }
};