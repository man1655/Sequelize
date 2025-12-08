
// export const addEmployee = async (employeeData) => {
//   //required all feilds
//   const requiredFields = [
//     "name",
//     "email",
//     "department_id",
//     "position",
//     "salary",
//     "skills",
//   ];
//   for (let field of requiredFields) {
//     if (!employeeData[field]) {
//       throw new Error(`${field} is required`);
//     }
//   }
//   //email unique
//   const existingEmployee = await Employee.findOne({
//     email: employeeData.email,
//   });
//   if (existingEmployee) {
//     throw new Error("Email already exists");
//   }
//   //id
//   const lastEmp = await Employee.findOne().sort({ employee_id: -1 });
//   const newId = lastEmp ? lastEmp.employee_id + 1 : 1;
//   //create
//   await Employee.create({
//     employee_id: newId,
//     status: "active",
//     salary_history: [{ salary: employeeData.salary }],
//     ...employeeData,
//   });
//   return Employee;
// };

// export const updateSalary = async (employeeId, newSalary) => {
//   //check user
//   const employee = await Employee.findOne({ employee_id: employeeId });
//   if (!employee) {
//     throw new Error("Employee not found");
//   }
//   //salary increase < 25%
//   const currentSalary = employee.salary;
//   const max_Allowed_Salary = currentSalary * 1.25;

//   if (newSalary > max_Allowed_Salary) {
//     throw new Error("salary cant be exceded 25%");
//   }

//   //update salry-review-date
//   const currentDate = new Date();
//   employee.last_salary_review_date = currentDate;
//   employee.salary = newSalary;

//   //history
//   employee.salary_history.push({ salary: newSalary, date: currentDate });

//   await employee.save();
//   return employee;
// };

// export const transferEmployees = async (employeeIds, newDepartmentId) => {
//   if (!newDepartmentId) throw new Error("New department is required");
//   const reasult = await Employee.updateMany(
//     { employee_id: { $in: employeeIds } },
//     { $set: { department_id: newDepartmentId } }
//   );

//   return {
//     successCount: reasult.modifiedCount,
//     failureCount: employeeIds.length - reasult.modifiedCount,
//   };
// };
