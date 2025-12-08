// import { addEmployee,updateSalary,transferEmployees } from "../services/employee.service.js";

// export const createEmployee = async (req, res) => {
//   try {
//     const employee = await addEmployee(req.body);
//     res.status(201).json({ success: true, data: employee });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// export const chnageSalary = async (req, res) => {
//   const { employeeId } = req.params;
//   const { newSalary } = req.body;
//   try{
//   const employee=await updateSalary(employeeId,newSalary);
//   res.status(200).json({success:true,data:employee});
//   }catch(err){
//     res.status(400).json({success:false,error:err.message});
//   }
// };

// export const bulkTransfer = async (req, res) => {
//   try{
//     const { employeeIds, newDepartmentId } = req.body;
//     const result = await transferEmployees(employeeIds, newDepartmentId);
//     res.status(200).json({ success: true, data: result });

//   }
//   catch(err){
//     res.status(400).json({success:false,error:err.message});
//   }
// };
