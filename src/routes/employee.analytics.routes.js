import express from 'express'
import { departmentPerformance , SkillsGapAnalysis,salaryEquityReport, retentionRiskReport } from '../Controllers/employee.analytics.controller.js';

const Router=express.Router();

Router.get('/department-performance',departmentPerformance)

Router.get('/skills-gap-analysis',SkillsGapAnalysis)

Router.get('/salary-equity-analysis',salaryEquityReport)

Router.get('/employee-retention-risk',retentionRiskReport )

export default Router;