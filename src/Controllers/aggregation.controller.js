// import { averagePromotionTimeService,  commonCareerPathsService, departmentBudgetUtilization, getDepartmentResourceDistribution, getEmployeesWithHighestLoad, getUnderutilizedEmployees,  skillProgressionCorrelationService } from "../services/aggregation.services.js";

import { departmentBudgetUtilization,getDepartmentResourceDistribution,getEmployeesWithHighestLoad, getUnderutilizedEmployees} from "../services/aggregation.services.js";

export const getBudgetUtilizationReport = async (req, res) => {
  try {
    const report = await departmentBudgetUtilization();
    res.json({ success: true, data: report });
  } catch (error) {
    console.error("Error in Budget Utilization:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


export const highestLoad = async (req, res) => {
  try {
    const data = await getEmployeesWithHighestLoad();
    const data1 = data.slice(0, 3);
    return res.json({ success: true, data1 });
  } catch (err) {
    console.error("highestLoad error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch highest load employees", error: err.message });
  }
};


export const underutilized = async (req, res) => {
  try {
    
    const data = await getUnderutilizedEmployees();
    const data1=data.slice(0,3);

    return res.json({ success: true, data1 });
  } catch (err) {
    console.error("underutilized error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch underutilized employees", error: err.message });
  }
};

export const departmentDistribution = async (req, res) => {
  try {
   

    const data = await getDepartmentResourceDistribution();

    return res.json({ success: true, data });
  } catch (err) {
    console.error("departmentDistribution error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch department distribution", error: err.message });
  }
};


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

