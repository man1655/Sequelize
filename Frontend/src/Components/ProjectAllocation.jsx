import React, { useState } from 'react';
import { DollarSign, Award, TrendingUp, ArrowLeft, RefreshCw, Trophy, Star, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const ProjectAllocation = () => {
  const [activeTab, setActiveTab] = useState('salary');
    const navigate=useNavigate();
  

  // Sample data - replace with your API data
  const [data, setData] = useState({
    salaryBands: [
      { Position: 'Senior Software Engineer', Total_Salary: 850000, Average_Salary: 95000, Minimum_Salary: 85000, Maximum_Salary: 110000, count: 9 },
      { Position: 'Product Manager', Total_Salary: 720000, Average_Salary: 90000, Minimum_Salary: 80000, Maximum_Salary: 105000, count: 8 },
      { Position: 'Software Engineer', Total_Salary: 650000, Average_Salary: 72000, Minimum_Salary: 65000, Maximum_Salary: 85000, count: 9 },
      { Position: 'Sales Manager', Total_Salary: 540000, Average_Salary: 90000, Minimum_Salary: 85000, Maximum_Salary: 95000, count: 6 },
      { Position: 'Marketing Specialist', Total_Salary: 420000, Average_Salary: 60000, Minimum_Salary: 55000, Maximum_Salary: 68000, count: 7 },
      { Position: 'HR Specialist', Total_Salary: 360000, Average_Salary: 60000, Minimum_Salary: 55000, Maximum_Salary: 65000, count: 6 },
      { Position: 'Data Analyst', Total_Salary: 340000, Average_Salary: 68000, Minimum_Salary: 62000, Maximum_Salary: 75000, count: 5 }
    ],
    bonusEligibility: [
      { employee_id: 1001, name: 'Sarah Johnson', position: 'Senior Software Engineer', department_id: 1, salary: 105000, performance_score: 9.5, hire_date: '2023-01-15' },
      { employee_id: 1002, name: 'Michael Chen', position: 'Product Manager', department_id: 1, salary: 98000, performance_score: 9.2, hire_date: '2023-02-20' },
      { employee_id: 1003, name: 'Emily Davis', position: 'Sales Manager', department_id: 2, salary: 92000, performance_score: 9.8, hire_date: '2023-03-10' },
      { employee_id: 1004, name: 'James Wilson', position: 'Senior Software Engineer', department_id: 1, salary: 110000, performance_score: 9.4, hire_date: '2023-01-25' },
      { employee_id: 1005, name: 'Lisa Anderson', position: 'Data Analyst', department_id: 3, salary: 72000, performance_score: 9.1, hire_date: '2023-04-05' }
    ],
    promotionRecommendations: [
      { Employee_ID: 2001, Employee_Name: 'David Martinez', Position: 'Software Engineer', Salary: 78000, Last_Promotion_Date: '2022-06-15' },
      { Employee_ID: 2002, Employee_Name: 'Jessica Brown', Position: 'Marketing Specialist', Salary: 62000, Last_Promotion_Date: '2022-08-20' },
      { Employee_ID: 2003, Employee_Name: 'Chris Lee', Position: 'Software Engineer', Salary: 75000, Last_Promotion_Date: '2022-09-10' },
      { Employee_ID: 2004, Employee_Name: 'Amanda Taylor', Position: 'Sales Representative', Salary: 58000, Last_Promotion_Date: null },
      { Employee_ID: 2005, Employee_Name: 'Robert Garcia', Position: 'Data Analyst', Salary: 68000, Last_Promotion_Date: '2022-07-25' }
    ]
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never promoted';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysSince = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPerformanceColor = (score) => {
    if (score >= 9.5) return 'bg-green-900 text-green-300 border-green-700';
    if (score >= 9.0) return 'bg-blue-900 text-blue-300 border-blue-700';
    return 'bg-yellow-900 text-yellow-300 border-yellow-700';
  };

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
                <h1 className="text-3xl font-bold text-white">Compensation & Promotion Report</h1>
                <p className="text-slate-400 mt-1">Salary analysis, bonus eligibility, and promotion recommendations</p>
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
              <DollarSign className="w-8 h-8 text-white" />
              <span className="text-white text-sm font-medium">Salary Bands</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.salaryBands.length}</p>
            <p className="text-blue-200 text-sm mt-1">Position levels</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 border border-green-500">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 text-white" />
              <span className="text-white text-sm font-medium">Bonus Eligible</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.bonusEligibility.length}</p>
            <p className="text-green-200 text-sm mt-1">High performers</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 border border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-white" />
              <span className="text-white text-sm font-medium">Promotions Due</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.promotionRecommendations.length}</p>
            <p className="text-purple-200 text-sm mt-1">Ready for advancement</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800 rounded-t-xl border border-slate-700 border-b-0">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('salary')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'salary'
                  ? 'border-blue-500 text-blue-400 bg-slate-750'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Salary Bands ({data.salaryBands.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('bonus')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'bonus'
                  ? 'border-green-500 text-green-400 bg-slate-750'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Bonus Eligibility ({data.bonusEligibility.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('promotion')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'promotion'
                  ? 'border-purple-500 text-purple-400 bg-slate-750'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Promotion Recommendations ({data.promotionRecommendations.length})</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-800 rounded-b-xl border border-slate-700 border-t-0 overflow-hidden">
          
          {/* Salary Bands Table */}
          {activeTab === 'salary' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-750">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Position</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Total Salary</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Average Salary</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Min Salary</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Max Salary</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.salaryBands.map((band, idx) => {
                    const range = band.Maximum_Salary - band.Minimum_Salary;
                    return (
                      <tr key={idx} className="hover:bg-slate-750 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                              <Award className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-white font-medium">{band.Position}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white font-semibold">{formatCurrency(band.Total_Salary)}</td>
                        <td className="px-6 py-4 text-slate-300">{formatCurrency(band.Average_Salary)}</td>
                        <td className="px-6 py-4 text-slate-300">{formatCurrency(band.Minimum_Salary)}</td>
                        <td className="px-6 py-4 text-slate-300">{formatCurrency(band.Maximum_Salary)}</td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <span className="text-slate-400 text-sm">{formatCurrency(range)}</span>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${(range / band.Maximum_Salary) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Bonus Eligibility Table */}
          {activeTab === 'bonus' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-750">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Employee ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Position</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Department</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Salary</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Performance</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Hire Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.bonusEligibility.map((employee, idx) => (
                    <tr key={idx} className="hover:bg-slate-750 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-300">{employee.employee_id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{employee.name.charAt(0)}</span>
                          </div>
                          <span className="text-white font-medium">{employee.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{employee.position}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm">
                          {getDepartmentName(employee.department_id)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{formatCurrency(employee.salary)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPerformanceColor(employee.performance_score)}`}>
                            {employee.performance_score.toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{formatDate(employee.hire_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Promotion Recommendations Table */}
          {activeTab === 'promotion' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-750">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Employee ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Position</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Current Salary</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Last Promotion</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Days Since</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.promotionRecommendations.map((employee, idx) => {
                    const daysSince = employee.Last_Promotion_Date ? getDaysSince(employee.Last_Promotion_Date) : null;
                    const isOverdue = !employee.Last_Promotion_Date || daysSince > 540;
                    return (
                      <tr key={idx} className="hover:bg-slate-750 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-300">{employee.Employee_ID}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">{employee.Employee_Name.charAt(0)}</span>
                            </div>
                            <span className="text-white font-medium">{employee.Employee_Name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{employee.Position}</td>
                        <td className="px-6 py-4 text-white font-medium">{formatCurrency(employee.Salary)}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">
                          {formatDate(employee.Last_Promotion_Date)}
                        </td>
                        <td className="px-6 py-4">
                          {daysSince ? (
                            <span className="text-slate-400 text-sm">{daysSince} days</span>
                          ) : (
                            <span className="text-slate-500 text-sm italic">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center w-fit space-x-1 ${
                            isOverdue 
                              ? 'bg-red-900 text-red-300 border border-red-700' 
                              : 'bg-purple-900 text-purple-300 border border-purple-700'
                          }`}>
                            {isOverdue && <AlertCircle className="w-3 h-3" />}
                            <span>{isOverdue ? 'Overdue' : 'Eligible'}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectAllocation;