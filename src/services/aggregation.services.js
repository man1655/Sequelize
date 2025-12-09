import { literal, Sequelize } from "sequelize";
import { Department, Employee, Project, ProjectAssignment, sequelize } from "../models/AllModels.js";


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

// // 3.2 Career Progression
// export const averagePromotionTimeService = async () => {
//   const pipeline = [
//     { $match: { "promotion_history.1": { $exists: true } } },
//     {
//       $project: {
//         promotion_history: {
//           $map: {
//             input: { $range: [1, { $size: "$promotion_history" }] },
//             as: "i",
//             in: {
//               $divide: [
//                 {
//                   $subtract: [
//                     {
//                       $toDate: {
//                         $arrayElemAt: ["$promotion_history.date", "$$i"],
//                       },
//                     },
//                     {
//                       $toDate: {
//                         $arrayElemAt: [
//                           "$promotion_history.date",
//                           { $subtract: ["$$i", 1] },
//                         ],
//                       },
//                     },
//                   ],
//                 },
//                 1000 * 60 * 60 * 24, // convert ms to days
//               ],
//             },
//           },
//         },
//       },
//     },
//     { $unwind: "$promotion_history" },
//     { $group: { _id: null, avgDays: { $avg: "$promotion_history" } } },
//   ];

//   const [result] = await Employee.aggregate(pipeline).exec();

//   const avgDays = result?.avgDays || 0;

//   return {
//     averagePromotionDays: avgDays,
//     averagePromotionYears: (avgDays / 365).toFixed(2),
//   };
// };

// export const commonCareerPathsService = async () => {
//   const pipeline = [
//     {
//       $project: {
//         path: {
//           $map: { input: "$promotion_history", as: "p", in: "$$p.position" },
//         },
//       },
//     },
//     {
//       $project: {
//         pathString: {
//           $reduce: {
//             input: "$path",
//             initialValue: "",
//             in: {
//               $concat: [
//                 {
//                   $cond: [
//                     { $eq: ["$$value", ""] },
//                     "",
//                     { $concat: ["$$value", " → "] },
//                   ],
//                 },
//                 "$$this",
//               ],
//             },
//           },
//         },
//       },
//     },
//     { $group: { _id: "$pathString", count: { $sum: 1 } } },
//   ];

//   const result = await Employee.aggregate(pipeline).exec();

//   return result.reduce((acc, r) => {
//     acc[r._id] = r.count;
//     return acc;
//   }, {});
// };

// export const skillProgressionCorrelationService = async () => {
//   const pipeline = [
//     { $match: { "promotion_history.1": { $exists: true } } },
//     {
//       $project: {
//         skills: 1,
//         promotionDiffs: {
//           $map: {
//             input: { $range: [1, { $size: "$promotion_history" }] },
//             as: "i",
//             in: {
//               $divide: [
//                 {
//                   $subtract: [
//                     {
//                       $toDate: {
//                         $arrayElemAt: ["$promotion_history.date", "$$i"],
//                       },
//                     },
//                     {
//                       $toDate: {
//                         $arrayElemAt: [
//                           "$promotion_history.date",
//                           { $subtract: ["$$i", 1] },
//                         ],
//                       },
//                     },
//                   ],
//                 },
//                 1000 * 60 * 60 * 24, // ms → days
//               ],
//             },
//           },
//         },
//       },
//     },
//     {
//       $addFields: {
//         avgPromotionDays: { $avg: "$promotionDiffs" },
//       },
//     },
//     { $unwind: "$skills" },
//     { $group: { _id: "$skills", avgDays: { $avg: "$avgPromotionDays" } } },
//     {
//       $project: {
//         _id: 0,
//         skill: "$_id",
//         avgYears: { $divide: ["$avgDays", 365] },
//       },
//     },
//   ];

//   const raw = await Employee.aggregate(pipeline).exec();

//   return raw.reduce((acc, r) => {
//     acc[r.skill] = r.avgYears.toFixed(2);
//     return acc;
//   }, {});
// };
