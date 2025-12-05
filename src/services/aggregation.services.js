import { Department } from "../models/Department.model.js";
import { Employee } from "../models/Employee.model.js";

export const departmentBudgetUtilization = () => {
  return Department.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "department_id",
        foreignField: "department_id",
        as: "employees",
      },
    },
    {
      $addFields: {
        totalSalary: { $sum: "$employees.salary" },
      },
    },
    {
      $addFields: {
        utilizationPercent: {
          $cond: [
            { $gt: ["$budget", 0] },
            {
              $round: [
                {
                  $multiply: [{ $divide: ["$totalSalary", "$budget"] }, 100],
                },
                2,
              ],
            },
            0,
          ],
        },
        budgetStatus: {
          $cond: [
            { $gt: ["$totalSalary", "$budget"] },
            "Over Budget",
            "Under Budger",
          ],
        },
      },
    },

    {
      $project: {
        _id: 0,
        department_id: 1,
        department_name: "$name",
        budget: 1,
        totalSalary: 1,
        utilizationPercent: 1,
        budgetStatus: 1,
      },
    },
    { $sort: { utilizationPercent: -1 } },
  ]);
};

export const getEmployeesWithHighestLoad = async ({
  limit = 10,
  includeInactive = false,
} = {}) => {
  const matchStage = includeInactive ? {} : { status: "active" };

  const pipeline = [
    { $match: matchStage },
    {
      $project: {
        employee_id: 1,
        name: 1,
        department_id: 1,
        position: 1,
        performance_score: 1,
        projectCount: { $size: { $ifNull: ["$projects", []] } },
      },
    },
    { $sort: { projectCount: -1, performance_score: -1 } },
    { $limit: parseInt(limit, 10) },
  ];

  return Employee.aggregate(pipeline).exec();
};

export const getUnderutilizedEmployees = async ({
  threshold = 1,
  includeInactive = false,
} = {}) => {
  const matchStatus = includeInactive ? {} : { status: "active" };

  const pipeline = [
    { $match: matchStatus },
    {
      $project: {
        employee_id: 1,
        name: 1,
        department_id: 1,
        position: 1,
        performance_score: 1,
        projectCount: { $size: { $ifNull: ["$projects", []] } },
      },
    },
    { $match: { projectCount: { $lte: parseInt(threshold, 1) } } },
    { $sort: { projectCount: 1, performance_score: -1, name: 1 } },
  ];

  return Employee.aggregate(pipeline).exec();
};

export const getDepartmentResourceDistribution = async ({
  includeInactive = false,
} = {}) => {
  const matchStatus = includeInactive ? {} : { status: "active" };

  const pipeline = [
    { $match: matchStatus },
    {
      $project: {
        department_id: 1,
        position: 1,
        projectCount: { $size: { $ifNull: ["$projects", []] } },
      },
    },

    {
      $group: {
        _id: { dept: "$department_id", position: "$position" },
        positionCount: { $sum: 1 },
        totalProjectsForPosition: { $sum: "$projectCount" },
      },
    },
    {
      $group: {
        _id: "$_id.dept",
        employeeCount: { $sum: "$positionCount" },
        totalProjects: { $sum: "$totalProjectsForPosition" },
        positions: {
          $push: {
            position: "$_id.position",
            count: "$positionCount",
          },
        },
      },
    },
    {
      $addFields: {
        avgProjectsPerEmployee: {
          $cond: [
            { $gt: ["$employeeCount", 0] },
            { $divide: ["$totalProjects", "$employeeCount"] },
            0,
          ],
        },
      },
    },
    { $sort: { _id: 1 } },
  ];

  const raw = await Employee.aggregate(pipeline).exec();

  return raw.map((d) => ({
    department_id: d._id,
    employeeCount: d.employeeCount,
    totalProjects: d.totalProjects,
    avgProjectsPerEmployee: Number(d.avgProjectsPerEmployee.toFixed(2)),
    positionBreakdown: d.positions,
  }));
};

// 3.2 Career Progression
export const averagePromotionTimeService = async () => {
  const pipeline = [
    { $match: { "promotion_history.1": { $exists: true } } },
    {
      $project: {
        promotion_history: {
          $map: {
            input: { $range: [1, { $size: "$promotion_history" }] },
            as: "i",
            in: {
              $divide: [
                {
                  $subtract: [
                    {
                      $toDate: {
                        $arrayElemAt: ["$promotion_history.date", "$$i"],
                      },
                    },
                    {
                      $toDate: {
                        $arrayElemAt: [
                          "$promotion_history.date",
                          { $subtract: ["$$i", 1] },
                        ],
                      },
                    },
                  ],
                },
                1000 * 60 * 60 * 24, // convert ms to days
              ],
            },
          },
        },
      },
    },
    { $unwind: "$promotion_history" },
    { $group: { _id: null, avgDays: { $avg: "$promotion_history" } } },
  ];

  const [result] = await Employee.aggregate(pipeline).exec();

  const avgDays = result?.avgDays || 0;

  return {
    averagePromotionDays: avgDays,
    averagePromotionYears: (avgDays / 365).toFixed(2),
  };
};

export const commonCareerPathsService = async () => {
  const pipeline = [
    {
      $project: {
        path: {
          $map: { input: "$promotion_history", as: "p", in: "$$p.position" },
        },
      },
    },
    {
      $project: {
        pathString: {
          $reduce: {
            input: "$path",
            initialValue: "",
            in: {
              $concat: [
                {
                  $cond: [
                    { $eq: ["$$value", ""] },
                    "",
                    { $concat: ["$$value", " → "] },
                  ],
                },
                "$$this",
              ],
            },
          },
        },
      },
    },
    { $group: { _id: "$pathString", count: { $sum: 1 } } },
  ];

  const result = await Employee.aggregate(pipeline).exec();

  return result.reduce((acc, r) => {
    acc[r._id] = r.count;
    return acc;
  }, {});
};

export const skillProgressionCorrelationService = async () => {
  const pipeline = [
    { $match: { "promotion_history.1": { $exists: true } } },
    {
      $project: {
        skills: 1,
        promotionDiffs: {
          $map: {
            input: { $range: [1, { $size: "$promotion_history" }] },
            as: "i",
            in: {
              $divide: [
                {
                  $subtract: [
                    {
                      $toDate: {
                        $arrayElemAt: ["$promotion_history.date", "$$i"],
                      },
                    },
                    {
                      $toDate: {
                        $arrayElemAt: [
                          "$promotion_history.date",
                          { $subtract: ["$$i", 1] },
                        ],
                      },
                    },
                  ],
                },
                1000 * 60 * 60 * 24, // ms → days
              ],
            },
          },
        },
      },
    },
    {
      $addFields: {
        avgPromotionDays: { $avg: "$promotionDiffs" },
      },
    },
    { $unwind: "$skills" },
    { $group: { _id: "$skills", avgDays: { $avg: "$avgPromotionDays" } } },
    {
      $project: {
        _id: 0,
        skill: "$_id",
        avgYears: { $divide: ["$avgDays", 365] },
      },
    },
  ];

  const raw = await Employee.aggregate(pipeline).exec();

  return raw.reduce((acc, r) => {
    acc[r.skill] = r.avgYears.toFixed(2);
    return acc;
  }, {});
};
