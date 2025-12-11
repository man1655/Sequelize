import './App.css'
import HomePage from './Components/HomePage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MonthlyReport from './Components/MonthlyReport';
import SkillInventory from './Components/SkillInventory';
import ProjectAllocation from './Components/ProjectAllocation';
import ImageHandler from './Components/ImageHandler';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Monthly-Report' element={<MonthlyReport/>}/>
        <Route path='/Skill-Inventory' element={<ProjectAllocation/>}/>
        <Route path='/Department-Report' element={<SkillInventory/>}/>
        <Route path='/image-preview' element={<ImageHandler/>}/>

      </Routes>
    </Router>
      
    </>
  )
}

export default App
