import React, { useState ,useEffect} from 'react';
import { Award, TrendingUp, AlertTriangle, ArrowLeft, RefreshCw, Users, Zap, Target, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch,useSelector} from 'react-redux';
import { fetchSalaryBand } from '../Features/Department/skillInventorySlice';


const SkillInventory = () => {
  const [activeTab, setActiveTab] = useState('common');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(() => {
  window.scrollTo(0, 0);
}, []);
    
  const {salaryBand=[]}=useSelector((state)=>state.Skill);

  useEffect(()=>{
        dispatch(fetchSalaryBand());    
      },[dispatch])
  
  // Sample data - replace with your API data
  const [data, setData] = useState({
    rareSkills: [
      { skill: 'Rust', employee_count: 2 },
      { skill: 'Blockchain Development', employee_count: 2 },
      { skill: 'Machine Learning', employee_count: 3 },
      { skill: 'GraphQL', employee_count: 4 },
      { skill: 'Kubernetes', employee_count: 5 },
      { skill: 'Go', employee_count: 6 },
      { skill: 'Swift', employee_count: 7 },
      { skill: 'Data Science', employee_count: 8 },
      { skill: 'DevOps', employee_count: 9 },
      { skill: 'Cloud Architecture', employee_count: 10 }
    ],
    skillGaps: [
      { department_id: 1, skill: 'TypeScript', department_name: 'Engineering' },
      { department_id: 1, skill: 'Docker', department_name: 'Engineering' },
      { department_id: 1, skill: 'AWS', department_name: 'Engineering' },
      { department_id: 2, skill: 'Salesforce', department_name: 'Sales' },
      { department_id: 2, skill: 'CRM Management', department_name: 'Sales' },
      { department_id: 3, skill: 'SEO', department_name: 'Marketing' },
      { department_id: 3, skill: 'Content Strategy', department_name: 'Marketing' },
      { department_id: 3, skill: 'Adobe Creative Suite', department_name: 'Marketing' },
      { department_id: 4, skill: 'HR Analytics', department_name: 'HR' },
      { department_id: 5, skill: 'Financial Modeling', department_name: 'Finance' }
    ]
  });

  const getDepartmentName = (id) => {
    const departments = {
      1: 'Engineering',
      2: 'Sales',
      3: 'Marketing',
      4: 'HR',
      5: 'Finance'
    };
    return departments[id] || 'Unknown';
  };

  const getDepartmentColor = (deptName) => {
    const colors = {
      'Engineering': 'bg-blue-900 text-blue-300 border-blue-700',
      'Sales': 'bg-green-900 text-green-300 border-green-700',
      'Marketing': 'bg-purple-900 text-purple-300 border-purple-700',
      'HR': 'bg-orange-900 text-orange-300 border-orange-700',
      'Finance': 'bg-pink-900 text-pink-300 border-pink-700'
    };
    return colors[deptName] || 'bg-slate-700 text-slate-300';
  };

  const getSkillLevel = (count) => {
    if (count >= 30) return { label: 'Expert', color: 'bg-green-600' };
    if (count >= 20) return { label: 'Advanced', color: 'bg-blue-600' };
    if (count >= 10) return { label: 'Intermediate', color: 'bg-yellow-600' };
    return { label: 'Beginner', color: 'bg-orange-600' };
  };

  // Group skill gaps by department
  const groupedSkillGaps = data.skillGaps.reduce((acc, item) => {
    const deptName = item.department_name || getDepartmentName(item.department_id);
    if (!acc[deptName]) {
      acc[deptName] = [];
    }
    acc[deptName].push(item.skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={()=>navigate('/')} className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-300" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">Skills Inventory</h1>
                <p className="text-slate-400 mt-1">Comprehensive skills analysis and gap identification</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4 text-slate-300" />
              <span className="text-slate-300 text-sm font-medium">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 border border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-white" />
              <span className="text-white text-sm font-medium">Most Common</span>
            </div>
            <p className="text-3xl font-bold text-white">{salaryBand.length}</p>
            <p className="text-blue-200 text-sm mt-1">Top skills in organization</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 border border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8 text-white" />
              <span className="text-white text-sm font-medium">Rare Skills</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.rareSkills.length}</p>
            <p className="text-orange-200 text-sm mt-1">Specialized expertise</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 border border-red-500">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-white" />
              <span className="text-white text-sm font-medium">Skill Gaps</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.skillGaps.length}</p>
            <p className="text-red-200 text-sm mt-1">Required but missing</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800 rounded-t-xl border border-slate-700 border-b-0">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('common')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'common'
                  ? 'border-blue-500 text-blue-400 bg-slate-750'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Most Common Skills</span>
            </button>
            <button
              onClick={() => setActiveTab('rare')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'rare'
                  ? 'border-orange-500 text-orange-400 bg-slate-750'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Rare Skills</span>
            </button>
            <button
              onClick={() => setActiveTab('gaps')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'gaps'
                  ? 'border-red-500 text-red-400 bg-slate-750'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Skill Gaps by Department</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-800 rounded-b-xl border border-slate-700 border-t-0">
          
          {/* Most Common Skills */}
          {activeTab === 'common' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Top 5 Most Common Skills</h3>
                <p className="text-slate-400 text-sm">Skills with the highest number of employees</p>
              </div>
              <div className="space-y-4">
                {salaryBand.map((skill, idx) => {
                  const level = getSkillLevel(skill.count);
                  const percentage = (skill.count / salaryBand[0].count) * 100;
                  return (
                    <div key={idx} className="bg-slate-750 rounded-lg p-5 border border-slate-700 hover:border-slate-600 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">{skill.skill}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${level.color} text-white mt-1 inline-block`}>
                              {level.label}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-white">{skill.employee_count}</p>
                          <p className="text-slate-400 text-sm">employees</p>
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-400">Coverage</span>
                          <span className="text-xs text-blue-400 font-medium">{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-700">
                          <div
                            style={{ width: `${percentage}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Rare Skills */}
          {activeTab === 'rare' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Top 10 Rarest Skills</h3>
                <p className="text-slate-400 text-sm">Specialized skills with limited availability</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.rareSkills.map((skill, idx) => (
                  <div key={idx} className="bg-slate-750 rounded-lg p-5 border border-slate-700 hover:border-orange-500 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-orange-600 w-10 h-10 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">{skill.skill}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Users className="w-3 h-3 text-slate-400" />
                            <span className="text-sm text-slate-400">{skill.employee_count} {skill.employee_count === 1 ? 'employee' : 'employees'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-orange-900 text-orange-300 px-3 py-1 rounded-full text-xs font-medium">
                        Rare
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Gaps */}
          {activeTab === 'gaps' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Skill Gaps by Department</h3>
                <p className="text-slate-400 text-sm">Required skills that are currently missing in each department</p>
              </div>
              <div className="space-y-6">
                {Object.entries(groupedSkillGaps).map(([department, skills], idx) => (
                  <div key={idx} className="bg-slate-750 rounded-lg p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-600 w-10 h-10 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{department}</h4>
                          <p className="text-sm text-slate-400">{skills.length} missing skill{skills.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <span className="bg-red-900 text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                        Action Required
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border ${getDepartmentColor(department)}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">Recommendations</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Consider training programs for rare skills to increase organizational capability</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Prioritize hiring or training for skill gaps in critical departments</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Leverage employees with rare skills as mentors for knowledge transfer</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default SkillInventory;