import { Employee } from "../models/Employee.model.js";
import { Department } from "../models/Department.model.js";

export const  validateDataConsistency=async()=>{
  try{

    const issue={}

    const validDepartmentIds=await Department.find().distinct('department_id');
    issue.inValidDepartmentIds=await Employee.find({department_id:{$nin:validDepartmentIds}}).distinct('department_id');

    issue.duplicateEmails=await Employee.aggregate([
      {
        $group:{
        _id:"$email",
        count:{$sum:1}
        }  
      },
      {
        $match:{
          count:{$gt:1}
        }
      }
    ])
    return issue;
  }
  catch(exception){
    console.log(exception)
  }
}