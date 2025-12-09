import express from 'express'
import { departmentDistribution, getBudgetUtilizationReport, getCareerProgression, highestLoad, underutilized } from '../Controllers/aggregation.controller.js';


const Router=express.Router();




Router.get('/budget-utilization', getBudgetUtilizationReport)



Router.get('/highest-load',highestLoad)

Router.get('/underutilized',underutilized)

Router.get('/department-distribution',departmentDistribution)


Router.get("/career-progression", getCareerProgression);

export default Router;