import express from 'express'
import { departmentPerformance, retentionRiskReport, salaryEquityReport, SkillsGapAnalysis } from '../Controllers/employee.analytics.controller.js';

const Router=express.Router();

Router.get('/department-performance',departmentPerformance)

Router.get('/skills-gap-analysis/:skill',SkillsGapAnalysis)

Router.get('/salary-equity-analysis',salaryEquityReport)

Router.get('/employee-retention-risk',retentionRiskReport)

export default Router;