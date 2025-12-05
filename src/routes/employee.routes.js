import express from 'express'
import { bulkTransfer, chnageSalary, createEmployee } from '../Controllers/employee.controller.js';

const Router=express.Router();


Router.post('/add',createEmployee);

Router.put('/update/:employeeId',chnageSalary);

Router.put('/transfer',bulkTransfer);


export default Router;