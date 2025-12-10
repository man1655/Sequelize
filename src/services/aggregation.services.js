import { literal, Sequelize } from "sequelize";
import { Department, Employee, EmployeePromotionHistory, Project, ProjectAssignment, sequelize } from "../models/AllModels.js";


export const departmentBudgetUtilization = async () => {
  return await Department.findAll({
    attributes: [
      "department_id",
      "name",
      // Total Salary
      [
        Sequelize.fn("COALESCE", Sequelize.fn("SUM", Sequelize.col("Employees.salary")), 0),
        "totalSalary"
      ],  
      // Utilization %
      [
        Sequelize.literal(`
          COALESCE(
            ROUND( (SUM("Employees"."salary") / "Department"."budget") * 100, 2 ),
            0
          )
        `),
        "utilizationPercentage"
      ],
      // Budget Status
      [
        Sequelize.literal(`
          CASE 
            WHEN SUM("Employees"."salary") > "Department"."budget"
              THEN 'OVER BUDGET'
            ELSE 'UNDER BUDGET'
          END
        `),
        "budgetStatus"
      ]
    ],
    include: [
      {
        model: Employee,
        as: "Employees",
        attributes: []
      }
    ],
    group: ["Department.department_id", "Department.name"],
    raw: true
  });
};

// highest project load
// 
export const getEmployeesWithHighestLoad = async () => {
  return await Employee.findAll({
    attributes: [
      'employee_id',
      'name',
      [sequelize.fn('COUNT', sequelize.col('Projects.project_id')), 'projectcount']
    ],
    include: [
      {
        model: Project,
        attributes: [],
        through: { attributes: [] }
      }
    ],
    group: ['Employee.employee_id', 'Employee.name'],
    order: [[sequelize.literal('"projectcount"'), 'DESC']], // <- use quotes
    raw: true
  });
};

// Lowest project load
export const getUnderutilizedEmployees = async () => {
  return await Employee.findAll({
    attributes:[
      'employee_id',
      'name',
      [sequelize.fn('COUNT', sequelize.col('Projects.project_id')),'ProjectCount']
    ],
    include:[
      {
        model:Project,
        attributes:[],
        through:{attributes:[]}
      }
    ],
    group:['Employee.employee_id','Employee.name'],
    order:[[sequelize.literal('"ProjectCount"'),'ASC']]
  })
};

export const getDepartmentResourceDistribution = async () => {

 //DEPARTMENT-NAME
 //EMPLOYEE_SALARY
 //PROJECT-COUNT
 //TOTAL-EMPLOYEE
 
//  return await Department.findAll({
//   attributes:[
//     'department_id',
//     'name',
//     [sequelize.fn('COUNT',sequelize.col('Employees.employee_id')),'Total_Employees'],
//     [sequelize.fn('SUM',sequelize.col('Employees.salary')),'Total_Salary'],
//     [sequelize.fn('COUNT',sequelize.col('Projects.project_id')),'Project_Count']
//   ],
//   include:[
//     {
//       model:Employee,
//       attributes:[],
//     },
//     {
//       model:Project,
//       attributes:[],
      
//     }
//   ],
//   group:['Department.department_id','Department.name']
//  })


return await Department.findAll({
  attributes: [
    'department_id',
    'name',
    [sequelize.literal(`(
      SELECT COUNT(*)
      FROM employees e
      WHERE e.department_id = "Department".department_id
    )`), 'Total_Employees'],
    [sequelize.literal(`(
      SELECT SUM(salary)
      FROM employees e
      WHERE e.department_id = "Department".department_id
    )`), 'Total_Salary'],
    [sequelize.literal(`(
      SELECT COUNT(*)
      FROM projects p
      WHERE p.department_id = "Department".department_id
    )`), 'Project_Count']
  ],
  raw: true
});
};

// 3.2 Career Progression
export const averagePromotionTimeService = async () => {  
  return await sequelize.query(`
    SELECT 
        eph1.employee_id,
        e.name,
        AVG(
          DATE_PART('day', eph2.change_date::timestamp - eph1.change_date::timestamp)
        ) AS avg_days_between_promotions
    FROM employee_promotion_history eph1
    JOIN employee_promotion_history eph2
        ON eph1.employee_id = eph2.employee_id
        AND eph2.change_date = (
            SELECT MIN(eph3.change_date)
            FROM employee_promotion_history eph3
            WHERE eph3.employee_id = eph1.employee_id
            AND eph3.change_date > eph1.change_date
        )
    JOIN employees e 
        ON e.employee_id = eph1.employee_id
    GROUP BY eph1.employee_id, e.name
    ORDER BY avg_days_between_promotions ASC;
  `, {
    type: sequelize.QueryTypes.SELECT
  });
};

export const commonCareerPathsService = async () => {
  return await EmployeePromotionHistory.findAll({
    attributes: [
      'employee_id',
      [
        sequelize.fn(
          'STRING_AGG',
          sequelize.col('position'),
          ' → '  
        ),
        'career_path'
      ]
    ],
    group: ['employee_id'],
    order: ['employee_id'],
    raw: true
  });
 
};

export const skillProgressionCorrelationService = async () => {
  const query = `
    SELECT 
        s.skill,
        AVG(
            DATE_PART(
              'day',
              eph2.change_date::timestamp - eph1.change_date::timestamp
            )
        ) AS avg_days_between_promotions
    FROM employee_promotion_history eph1
    JOIN employee_promotion_history eph2
        ON eph1.employee_id = eph2.employee_id
       AND eph2.change_date = (
            SELECT MIN(eph3.change_date)
            FROM employee_promotion_history eph3
            WHERE eph3.employee_id = eph1.employee_id
              AND eph3.change_date > eph1.change_date
        )
    JOIN employee_skills s
        ON s.employee_id = eph1.employee_id
    GROUP BY s.skill
    ORDER BY avg_days_between_promotions;
  `;

  return await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT
  });
};
