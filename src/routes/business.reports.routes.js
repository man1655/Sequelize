import express from 'express'
// import { Bonus, commonskill, departmentChangeController, departuresController, employeeSalaryBan, newHiresController, rareSkill, recomondation, salaryChangesController, skillsGap } from '../Controllers/business.reports.controller.js';
import {newHiresController,departuresController,salaryChangesController, departmentChangeController,commonskill, rareSkill,skillsGap} from '../Controllers/business.reports.controller.js'



const Router=express.Router();

//MONTHLY-REPORTS
Router.get("/new-hires", newHiresController);
Router.get("/departures", departuresController);
Router.get("/salary-changes", salaryChangesController);
Router.get("/department-changes", departmentChangeController);

// //SKILLS-INVENTORY
Router.get('/commonSkill',commonskill)
Router.get('/rareSkill',rareSkill)
Router.get('/skillsGap',skillsGap)

// //COMPNASATION ANALYSIS
// Router.get('/salary-band',employeeSalaryBan);
// Router.get('/bonus',Bonus)
// Router.get('/promotion',recomondation)

export default Router;