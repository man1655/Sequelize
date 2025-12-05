import mongoose  from "mongoose";

export const createIndexes=async()=>{
  try{
    const Employee=mongoose.model("Employee");
    const Project=mongoose.model("Project");

    await Employee.collection.createIndex({department_id:1});
    
    await Employee.collection.createIndex({salary:1});

    await Employee.collection.createIndex({salary:1,skils:1})

    await Employee.collection.createIndex({skils:1});

    await Project.collection.createIndex({employees:1})
    console.log('Indexes created successfully');
  }catch(err){
    console.log(err)
  }
}
