// import e from "express";
// import { Employee } from "../models/Employee.model.js";
import { Op, fn, col, literal } from "sequelize";
import {
  Employee,
  EmployeeDepartmentHistory,
  EmployeeSalaryHistory,
  EmployeeSkill,
  DepartmentRequiredSkill,
  sequelize,
  EmployeePromotionHistory,
} from "../models/AllModels.js";

//   1: [
//     "JavaScript",
//     "Node.js",
//     "React",
//     "MongoDB",
//     "API Development",
//     "Git",
//     "DevOps Basics",
//     "Unit Testing",
//   ],
//   2: [
//     "SEO",
//     "Content Writing",
//     "Social Media Marketing",
//     "Google Analytics",
//     "Email Marketing",
//     "Brand Strategy",
//     "Copywriting",
//   ],
//   3: [
//     "Recruitment",
//     "Employee Relations",
//     "Onboarding",
//     "Payroll Processing",
//     "Compliance",
//     "Performance Management",
//   ],
//   4: [
//     "Budgeting",
//     "Accounting",
//     "Financial Reporting",
//     "Excel",
//     "Forecasting",
//     "Risk Management",
//   ],
// };

//Monthly Reports
export const getNewHires = async () => {
  const startmonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const endmonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );
  try {
    const data = await Employee.findAll({
      where: {
        hire_date: {
          [Op.between]: [startmonth, endmonth],
        },
      },
    });
    return { data };
  } catch (err) {
    console.error("Error in getNewHires:", err);
    return [];
  }
};

export const getDepartures = async () => {
  const startmonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const endmonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );
  try {
    const data = await Employee.findAll({
      where: {
        departure_date: {
          [Op.between]: [startmonth, endmonth],
        },
      },
    });
    return { data };
  } catch (err) {
    console.error("Error in getDeparture:", err);
    return [];
  }
};

export const getSalaryChnages = async () => {
  try {
    const startmonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const endmonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );

    const data = await Employee.findAll({
      attributes: ["employee_id", "name", ["salary", "current_salary"]],
      include: [
        {
          model: EmployeeSalaryHistory,
          attributes: [["salary", "previous_salary"], "date"],
          where: {
            date: { [Op.between]: [startmonth, endmonth] },
          },
          required: true,
        },
      ],
      order: [[EmployeeSalaryHistory, "date", "DESC"]], // latest first
    });

    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const departmentChange = async () => {
  try {
    const startmonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const endmonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );
    const data = await Employee.findAll({
      attributes: ["employee_id", "name", "department_id"],
      include: {
        model: EmployeeDepartmentHistory,
        attributes: ["department_id", "start_date", "end_date"],
        where: {
          start_date: {
            [Op.between]: [startmonth, endmonth],
          },
        },
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// //skills-inventory
export const mostCommnSkiil = async () => {
  try {
    const data = await EmployeeSkill.findAll({
      attributes: [
        "skill",
        [sequelize.fn("COUNT", sequelize.col("skill")), "count"],
      ],
      group: ["skill"],
      order: [["count", "DESC"]],
      limit: 3,
    });
    return data;
  } catch (ex) {
    console.log(ex);
  }
};

export const mostRareSkill = async () => {
  try {
    const data = await EmployeeSkill.findAll({
      attributes: [
        "skill",
        [sequelize.fn("COUNT", sequelize.col("skill")), "count"],
      ],
      group: ["skill"],
      order: [["count", "ASC"]],
      limit: 3,
    });
    return data;
  } catch (exception) {
    console.log(exception);
  }
};

export const skillsGapDepartment = async () => {
  try {
    const requiredSkills = await DepartmentRequiredSkill.findAll({
      attributes: ["department_id", "skill"],
      raw: true,
    });

    const employeeSkills = await EmployeeSkill.findAll({
      attributes: ["employee_id", "skill"],
      include: [
        {
          model: Employee,
          attributes: ["department_id"],
        },
      ],
      raw: true,
    });

    const gap = requiredSkills.filter(
      (req) =>
        !employeeSkills.some(
          (emp) =>
            emp["Employee.department_id"] === req.department_id &&
            emp.skill === req.skill
        )
    );

    return gap;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// //Compensation Analysis

//salary-band by position

export const salaryBand = async () => {
  try {
    const data = await Employee.findAll({
      attributes: [
        "position",
        [sequelize.fn("MIN", sequelize.col("salary")), "min_salary"],
        [sequelize.fn("MAX", sequelize.col("salary")), "max_salary"],
        [sequelize.fn("AVG", sequelize.col("salary")), "avg_salary"],
      ],
      group: ["position"],
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const bonusEligibility = async () => {
  try {
    const data = await Employee.findAll({
      attributes: ["employee_id", "name", "position", "salary"],
      where: literal(`CURRENT_DATE - "hire_date" > 180`),
    });
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const promotionRecommendation = async () => {
  try {
    const data = await Employee.findAll({
      attributes: [
        "employee_id",
        "name",
        "position",
        "salary",

        // LAST Promotion Date
        [
          fn("MAX", col('"EmployeePromotionHistories"."change_date"')),
          "last_promotion_date"
        ],

        // Days since last promotion OR hire date
        [
          literal(`
            CASE
              WHEN MAX("EmployeePromotionHistories"."change_date") IS NOT NULL
                THEN CURRENT_DATE - MAX("EmployeePromotionHistories"."change_date")
              ELSE CURRENT_DATE - "hire_date"
            END
          `),
          "days_since_last_promotion_or_hire"
        ]
      ],
      include: [
        {
          model: EmployeePromotionHistory,
          attributes: [], //
          required: false, // LEFT JOIN
        }
      ],
      where: {
        performance_score: { [Op.gt]: 8 },
      },
      having: literal(`
        (
          (MAX("EmployeePromotionHistories"."change_date") IS NOT NULL  
            AND CURRENT_DATE - MAX("EmployeePromotionHistories"."change_date") > 360)
          OR
          (MAX("EmployeePromotionHistories"."change_date") IS NULL 
            AND CURRENT_DATE - "hire_date" > 360)
        )
      `),
      group: [
        "Employee.employee_id",
        "Employee.name",
        "Employee.position",
        "Employee.salary"
      ],
      order: [
        [literal("last_promotion_date"), "ASC"]
      ],
      raw: true
    });

    return data;
  } catch (err) {
    console.error("Promotion Recommendation Error:", err);
    return [];
  }
};