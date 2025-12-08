// import { Employee } from "../models/Employee.model.js";

// export const getDepartmentReport = async () => {
//   return Employee.aggregate([
//     {
//       $lookup: {
//         from: "departments",
//         localField: "department_id",
//         foreignField: "department_id",
//         pipeline: [
//           {
//             $project: {
//               _id: 0,
//               name: 1,
//             },
//           },
//         ],
//         as: "department",
//       },
//     },
//     { $unwind: "$department" },

//     {
//       $group: {
//         _id: "$department_id",
//         department_name: { $first: "$department.name" },
//         avg_salary: { $avg: "$salary" },
//         employee_count: { $sum: 1 },
//         highest_paid_employee: { $max: "$salary" },
//       },
//     },
//     { $sort: { avg_salary: -1 } },
//   ]);
// };

// export const skillsGapAnalysis = async (skill) => {
//   return Employee.aggregate([
//     { $match: { skills: { $nin: [skill] } } },
//     {
//       $group: {
//         _id: "$department_id",
//         employees_missing_skill: { $push: "$name" },
//       },
//     },

//     {
//       $lookup: {
//         from: "employees",
//         pipeline: [
//           { $match: { skills: { $in: [skill] } } },
//           {
//             $project: {
//               employee_id: 1,
//               name: 1,
//               skills: 1,
//             },
//           },
//         ],
//         as: "available_candidates",
//       },
//     },
//   ]);
// };

// export const salaryEquityAnalysis = async () => {
//   return Employee.aggregate([
//     {
//       $group: {
//         _id: "$position",
//         avgSalary: { $avg: "$salary" },
//         employees: { $push: "$$ROOT" },
//       },
//     },

//     { $unwind: "$employees" },

//     {
//       $project: {
//         position: "$_id",
//         name: "$employees.name",
//         employee_id: "$employees.employee_id",
//         salary: "$employees.salary",
//         avgSalary: 1,
//         difference: {
//           $subtract: ["$employees.salary", "$avgSalary"],
//         },
//       },
//     },

//     {
//       $match: {
//         $or: [{ difference: { $gt: 5000 } }, { difference: { $lt: -10000 } }],
//       },
//     },
//   ]);
// };

// export const employeeRetentionRisk = async () => {
//   return Employee.aggregate([
//     {
//       $group: {
//         _id: "$position",
//         avgSalary: { $avg: "$salary" },
//         employees: { $push: "$$ROOT" },
//       },
//     },
//     { $unwind: "$employees" },
//     {
//       $project: {
//         employee_id: "$employees.employee_id",
//         name: "$employees.name",
//         position: "$employees.position",
//         performance: "$employees.performance_score",
//         salary: "$employees.salary",
//         avgSalary: 1,
//         salaryGap: {
//           $subtract: ["$employees.salary", "$avgSalary"],
//         },
//       },
//     },

//     {
//       $match: {
//         performance: { $gte: 8 },
//         salaryGap: { $lt: -5000 },
//       },
//     },

//     { $sort: { salaryGap: 1 } },
//   ]);
// };
