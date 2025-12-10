import './App.css'
import HomePage from './Components/HomePage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MonthlyReport from './Components/MonthlyReport';
import SkillInventory from './Components/SkillInventory';
import ProjectAllocation from './Components/ProjectAllocation';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Monthly-Report' element={<MonthlyReport/>}/>
        <Route path='/Skill-Inventory' element={<ProjectAllocation/>}/>
        <Route path='/Department-Report' element={<SkillInventory/>}/>




      </Routes>
    </Router>
      
    </>
  )
}

export default App
