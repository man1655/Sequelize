import e from "express";
import { Employee } from "../models/Employee.model.js";
const requiredSkills = {
  1: [
    "JavaScript",
    "Node.js",
    "React",
    "MongoDB",
    "API Development",
    "Git",
    "DevOps Basics",
    "Unit Testing",
  ],
  2: [
    "SEO",
    "Content Writing",
    "Social Media Marketing",
    "Google Analytics",
    "Email Marketing",
    "Brand Strategy",
    "Copywriting",
  ],
  3: [
    "Recruitment",
    "Employee Relations",
    "Onboarding",
    "Payroll Processing",
    "Compliance",
    "Performance Management",
  ],
  4: [
    "Budgeting",
    "Accounting",
    "Financial Reporting",
    "Excel",
    "Forecasting",
    "Risk Management",
  ],
};

//Monthly Reports
export const getNewHires = async () => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const hires = await Employee.aggregate([
      {
        $match: {
          hire_date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $project: {
          _id: 0,
          employee_id: 1,
          name: 1,
          hire_date: 1,
          department_id: 1,
        },
      },
    ]);

    console.log("New hires found:", hires.length);
    return hires;
  } catch (err) {
    console.error("Error in getNewHires:", err);
    return [];
  }
};

export const getDepartures = async () => {
  try {
    const today = new Date();
    const startOfMonth = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), 1)
    );
    const endOfMonth = new Date(
      Date.UTC(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59)
    );
    return Employee.aggregate([
      {
        $match: {
          status: "inactive",
          departure_date: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

export const getSalaryChnages = async () => {
  const today = new Date();
  const startOfMonth = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), 1)
  );
  const endOfMonth = new Date(
    Date.UTC(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59)
  );

  return Employee.aggregate([
    {
      $addFields: {
        old_salary: {
          $arrayElemAt: ["$salary_history.salary", 0],
        },
      },
    },
    { $unwind: "$salary_history" },
    {
      $match: {
        "salary_history.date": {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      },
    },
    {
      $project: {
        _id: 0,
        employee_id: 1,
        name: 1,
        old_salary: 1,
        new_salary: "$salary_history.salary",
        change_date: "$salary_history.date",
      },
    },
  ]);
};

export const departmentChange = async () => {
  const today = new Date();

  const startOfMonth = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), 1)
  );
  const endOfMonth = new Date(
    Date.UTC(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59)
  );

  return Employee.aggregate([
    // Step 1: Unwind history
    { $unwind: "$department_history" },

    // Step 2: Convert string → date safely
    {
      $addFields: {
        endDateConverted: {
          $cond: [
            { $eq: [{ $type: "$department_history.end_date" }, "string"] },
            { $toDate: "$department_history.end_date" },
            "$department_history.end_date",
          ],
        },
      },
    },

    // Step 3: Filter by converted date
    {
      $match: {
        endDateConverted: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      },
    },

    // Step 4: Output clean result
    {
      $project: {
        _id: 0,
        employee_id: 1,
        name: 1,
        old_department_id: "$department_history.department_id",
        new_department_id: "$department_id",
        change_date: "$endDateConverted",
      },
    },
  ]);
};

//skills-inventory
export const mostCommnSkiil = async () => {
  try {
    return Employee.aggregate([
      { $unwind: "$skills" },
      {
        $group: {
          _id: "$skills",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 3,
      },
      {
        $project: {
          _id: 0,
          skill: "$_id",
          count: 1,
        },
      },
    ]);
  } catch (ex) {
    console.log(ex);
  }
};

export const mostRareSkill = async () => {
  try {
    return Employee.aggregate([
      { $unwind: "$skills" },
      {
        $group: {
          _id: "$skills",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: 1,
        },
      },
      {
        $limit: 3,
      },
      {
        $project: {
          _id: 0,
          skill: "$_id",
          count: 1,
        },
      },
    ]);
  } catch (exception) {
    console.log(exception);
  }
};

export const skillsGapDepartment = async () => {
  try {
    return Employee.aggregate([
      {
        $unwind: "$skills",
      },
      {
        $group: {
          _id: "$department_id",
          skills: { $addToSet: "$skills" },
        },
      },
      {
        $addFields: {
          requiredSkills: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$_id", 1] },
                  then: requiredSkills[1],
                },
                {
                  case: { $eq: ["$_id", 2] },
                  then: requiredSkills[2],
                },
                {
                  case: { $eq: ["$_id", 3] },
                  then: requiredSkills[3],
                },
                {
                  case: { $eq: ["$_id", 4] },
                  then: requiredSkills[4],
                },
              ],
              default: [],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          department_id: "$_id",
          skills: 1,
          missingFeilds: {
            $setDifference: ["$requiredSkills", "$skills"],
          },
        },
      },
    ]);
  } catch (exception) {
    console.log(exception);
  }
};

//Compensation Analysis

//salary-band
export const salaryBand = async () => {
  try {
    return Employee.aggregate([
      {
        $group: {
          _id: "$position",
          avgsalary: { $avg: "$salary" },
          minsalary: { $min: "$salary" },
          maxsalary: { $max: "$salary" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          position: "$_id",
          avgsalary: 1,
          minsalary: 1,
          maxsalary: 1,
          count: 1,
        },
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

//Bonus-Eligiblity
export const bonusEligibility = async () => {
  try {
    return Employee.aggregate([
      {
        $addFields: {
          hireDateConverted: {
            $cond: [
              { $eq: [{ $type: "$hire_date" }, "string"] },
              { $toDate: "$hire_date" },
              "$hire_date",
            ],
          },
        },
      },
      {
        $addFields: {
          tenure_months: {
            $divide: [
              { $subtract: ["$$NOW", "$hireDateConverted"] },
              1000 * 60 * 60 * 24 * 30,
            ],
          },
        },
      },
      {
        $match: {
          tenure_months: { $gte: 12 },
          performance_score: { $gte: 8 },
          status: "active",
        },
      },
      {
        $project: {
          _id: 0,
          employee_id: 1,
          name: 1,
          department_id: 1,
          position: 1,
          performance_score: 1,
          tenure_months: { $round: ["$tenure_months", 1] },
        },
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};
//promtion recommndation
export const promotionRecomondation = async () => {
  try {
    return Employee.aggregate([
      {
        $addFields: {
          latestPromotion: { $last: "$promotion_history" },
        },
      },

      {
        $addFields: {
          hireDateConverted: {
            $cond: [
              { $eq: [{ $type: "$hire_date" }, "string"] },
              { $toDate: "$hire_date" },
              "$hire_date",
            ],
          },
          lastPromotionConverted: {
            $cond: [
              { $eq: [{ $type: "$latestPromotion.date" }, "string"] },
              { $toDate: "$latestPromotion.date" },
              "$latestPromotion.date",
            ],
          },
        },
      },

      {
        $addFields: {
          tenure_months: {
            $divide: [
              { $subtract: ["$$NOW", "$hireDateConverted"] },
              1000 * 60 * 60 * 24 * 30,
            ],
          },
          months_since_last_promotion: {
            $divide: [
              { $subtract: ["$$NOW", "$lastPromotionConverted"] },
              1000 * 60 * 60 * 24 * 30,
            ],
          },
        },
      },

      // Step 4: Apply promotion-recommendation rules
      {
        $match: {
          status: "active",
          performance_score: { $gte: 8 },
          tenure_months: { $gte: 18 },
          months_since_last_promotion: { $gte: 12 },
        },
      },

      // Step 5: Final output
      {
        $project: {
          _id: 0,
          employee_id: 1,
          name: 1,
          department_id: 1,
          position: 1,
          performance_score: 1,
          tenure_months: { $round: ["$tenure_months", 1] },
          months_since_last_promotion: {
            $round: ["$months_since_last_promotion", 1],
          },
        },
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};
