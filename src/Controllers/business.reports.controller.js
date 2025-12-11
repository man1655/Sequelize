


// import { bonusEligibility, departmentChange, getDepartures, getNewHires, getSalaryChnages, mostCommnSkiil, mostRareSkill, promotionRecomondation, salaryBand, skillsGapDepartment } from "../services/business.reports.services.js";

import {getNewHires,getDepartures,getSalaryChnages,departmentChange,mostCommnSkiil, mostRareSkill,skillsGapDepartment, salaryBand, bonusEligibility, promotionRecommendation} from '../services/business.reports.services.js';

export const newHiresController = async (req, res) => {
  try {
    const data = await getNewHires();

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {
    console.error("Error in newHiresController:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch new hires",
    });
  }
};


export const departuresController = async (req, res) => {
  try {
    const data = await getDepartures();

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {
    console.error("Error in departuresController:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch departures",
    });
  }
};



export const salaryChangesController = async (req, res) => {
  try {
    const data = await getSalaryChnages();

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {
    console.error("Error in salaryChangesController:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch salary changes",
    });
  }
};

export const departmentChangeController = async (req, res) => {
  try {
    const data = await departmentChange();

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {
    console.error("Error in departmentChangeController:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch department change report",
    });
  }
};



export const commonskill = async (req, res) => {
  try {
    const data = await mostCommnSkiil();

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {
    console.error("Error in departmentChangeController:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch department change report",
    });
  }
};

export const rareSkill=async(req,res)=>{
  try {
    const data = await mostRareSkill();

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {
    console.error("Error in departmentChangeController:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch department change report",
    });
  }
}


export const skillsGap=async(req,res)=>{
  try {
    const data = await skillsGapDepartment();

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {
    console.error("Error in departmentChangeController:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch department change report",
    });
  }
}


export const employeeSalaryBan=async(req,res)=>{
  try{
    const data=await salaryBand();
    if(data){
      res.status(200).json({data:data})
    }else{
      res.status(500).json("some err occured")
    }
  }
  catch(errr){
    console.log(errr);
    res.status(500).json("some err occured")
  }
}

export const Bonus=async(req,res)=>{
   try{
    const data=await bonusEligibility();
    if(data){
      res.status(200).json(data)
    }else{
      res.status(500).json("some err occured")
    }
  }
  catch(errr){
    console.log(errr);
    res.status(500).json("some err occured")
  }
}

export const recomondation=async(req,res)=>{
  try{
    const data=await promotionRecommendation();
    if(data){
      res.status(200).json(data)
    }else{
      res.status(500).json("some err occured")
    }
  }
  catch(errr){
    console.log(errr);
    res.status(500).json("some err occured")
  }
}