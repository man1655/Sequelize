// import { averagePromotionTimeService,  commonCareerPathsService, departmentBudgetUtilization, getDepartmentResourceDistribution, getEmployeesWithHighestLoad, getUnderutilizedEmployees,  skillProgressionCorrelationService } from "../services/aggregation.services.js";

// export const getBudgetUtilizationReport = async (req, res) => {
//   try {
//     const report = await departmentBudgetUtilization();
//     res.json({ success: true, data: report });
//   } catch (error) {
//     console.error("Error in Budget Utilization:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


// export const highestLoad = async (req, res) => {
//   try {
//     const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
//     const includeInactive = req.query.includeInactive === "true" || req.query.includeInactive === true;

//     const data = await getEmployeesWithHighestLoad({ limit, includeInactive });

//     return res.json({ success: true, data });
//   } catch (err) {
//     console.error("highestLoad error:", err);
//     return res.status(500).json({ success: false, message: "Failed to fetch highest load employees", error: err.message });
//   }
// };


// export const underutilized = async (req, res) => {
//   try {
//     const threshold = req.query.threshold ? parseInt(req.query.threshold, 10) : 1;
//     const includeInactive = req.query.includeInactive === "true" || req.query.includeInactive === true;

//     const data = await getUnderutilizedEmployees({ threshold, includeInactive });

//     return res.json({ success: true, data });
//   } catch (err) {
//     console.error("underutilized error:", err);
//     return res.status(500).json({ success: false, message: "Failed to fetch underutilized employees", error: err.message });
//   }
// };

// export const departmentDistribution = async (req, res) => {
//   try {
//     const includeInactive = req.query.includeInactive === "true" || req.query.includeInactive === true;

//     const data = await getDepartmentResourceDistribution({ includeInactive });

//     return res.json({ success: true, data });
//   } catch (err) {
//     console.error("departmentDistribution error:", err);
//     return res.status(500).json({ success: false, message: "Failed to fetch department distribution", error: err.message });
//   }
// };


// export const getCareerProgression = async (req, res) => {
// try {
// const avgPromotion = await averagePromotionTimeService();
// const commonPaths = await commonCareerPathsService();
// const skillsCorrelation = await skillProgressionCorrelationService();


// res.json({ success: true, data: { avgPromotion, commonPaths, skillsCorrelation } });
// } catch (err) {
// res.status(500).json({ success: false, error: err.message });
// }
// };

