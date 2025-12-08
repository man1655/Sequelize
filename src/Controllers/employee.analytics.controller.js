// import { getDepartmentReport,skillsGapAnalysis,salaryEquityAnalysis,employeeRetentionRisk } from "../services/employee.analytics.services.js";
import { employeeRetentionRisk, getDepartmentReport,salaryEquityAnalysis,skillsGapAnalysis } from "../services/employee.analytics.services.js";

export const departmentPerformance = async (req, res) => {
  try {
    const data = await getDepartmentReport();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const SkillsGapAnalysis = async (req, res) => {
  try {
    const data = await skillsGapAnalysis ();
    res.json({ success: true,data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const salaryEquityReport = async (req, res) => {
  try {
    const data = await salaryEquityAnalysis();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const retentionRiskReport = async (req, res) => {
  try {
    const data = await employeeRetentionRisk();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
