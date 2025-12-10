import React, { useState } from 'react';
import { Users, UserPlus, UserMinus, DollarSign, Building2, Calendar, ArrowLeft, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
const MonthlyReport = () => {

  const [activeTab, setActiveTab] = useState('hires');
  const navigate=useNavigate();
  // Sample data - replace with your API data
  const [data, setData] = useState({
    newHires: [
      { employee_id: 1001, employee_name: 'Sarah Johnson', department_id: 1, hire_date: '2024-12-05' },
      { employee_id: 1002, employee_name: 'Michael Chen', department_id: 2, hire_date: '2024-12-10' },
      { employee_id: 1003, employee_name: 'Emily Davis', department_id: 1, hire_date: '2024-12-15' },
      { employee_id: 1004, employee_name: 'James Wilson', department_id: 3, hire_date: '2024-12-20' }
    ],
    departures: [
      { employee_id: 2001, employee_name: 'Robert Taylor', department_id: 2, hire_date: '2022-05-12', departure_date: '2024-12-08' },
      { employee_id: 2002, employee_name: 'Lisa Anderson', department_id: 4, hire_date: '2021-03-20', departure_date: '2024-12-18' }
    ],
    salaryChanges: [
      { employee_id: 3001, employee_name: 'David Martinez', employee_email: 'david.m@company.com', history_salary: 75000, current_salary: 82000, salary_change_date: '2024-12-01' },
      { employee_id: 3002, employee_name: 'Jessica Brown', employee_email: 'jessica.b@company.com', history_salary: 68000, current_salary: 73000, salary_change_date: '2024-12-10' },
      { employee_id: 3003, employee_name: 'Chris Lee', employee_email: 'chris.l@company.com', history_salary: 85000, current_salary: 92000, salary_change_date: '2024-12-15' }
    ],
    departmentChanges: [
      { employee_id: 4001, department_id: 3, start_date: '2024-12-05' },
      { employee_id: 4002, department_id: 1, start_date: '2024-12-12' },
      { employee_id: 4003, department_id: 2, start_date: '2024-12-20' }
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateSalaryChange = (oldSalary, newSalary) => {
    const change = ((newSalary - oldSalary) / oldSalary) * 100;
    return change.toFixed(1);
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
                <h1 className="text-3xl font-bold text-white">Monthly Report</h1>
                <p className="text-slate-400 mt-1">December 2024 - Workforce Changes</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 border border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <UserPlus className="w-8 h-8 text-white" />
              <span className="text-white text-sm font-medium">New Hires</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.newHires.length}</p>
            <p className="text-blue-200 text-sm mt-1">This month</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 border border-red-500">
            <div className="flex items-center justify-between mb-2">
              <UserMinus className="w-8 h-8 text-white" />
              <span className="text-white text-sm font-medium">Departures</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.departures.length}</p>
            <p className="text-red-200 text-sm mt-1">This month</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 border border-green-500">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-white" />
              <span className="text-white text-sm font-medium">Salary Changes</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.salaryChanges.length}</p>
            <p className="text-green-200 text-sm mt-1">This month</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 border border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <Building2 className="w-8 h-8 text-white" />
              <span className="text-white text-sm font-medium">Dept Changes</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.departmentChanges.length}</p>
            <p className="text-purple-200 text-sm mt-1">This month</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800 rounded-t-xl border border-slate-700 border-b-0">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('hires')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'hires'
                  ? 'border-blue-500 text-blue-400 bg-slate-750'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>New Hires ({data.newHires.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('departures')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'departures'
                  ? 'border-red-500 text-red-400 bg-slate-750'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <UserMinus className="w-4 h-4" />
              <span>Departures ({data.departures.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('salary')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'salary'
                  ? 'border-green-500 text-green-400 bg-slate-750'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Salary Changes ({data.salaryChanges.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('department')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'department'
                  ? 'border-purple-500 text-purple-400 bg-slate-750'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Dept Changes ({data.departmentChanges.length})</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-800 rounded-b-xl border border-slate-700 border-t-0 overflow-hidden">
          
          {/* New Hires Table */}
          {activeTab === 'hires' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-750">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Employee ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Department</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Hire Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.newHires.map((employee, idx) => (
                    <tr key={idx} className="hover:bg-slate-750 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-300">{employee.employee_id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{employee.employee_name.charAt(0)}</span>
                          </div>
                          <span className="text-white font-medium">{employee.employee_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm">
                          {getDepartmentName(employee.department_id)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{formatDate(employee.hire_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Departures Table */}
          {activeTab === 'departures' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-750">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Employee ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Department</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Hire Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Departure Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.departures.map((employee, idx) => (
                    <tr key={idx} className="hover:bg-slate-750 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-300">{employee.employee_id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{employee.employee_name.charAt(0)}</span>
                          </div>
                          <span className="text-white font-medium">{employee.employee_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-red-900 text-red-300 px-3 py-1 rounded-full text-sm">
                          {getDepartmentName(employee.department_id)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{formatDate(employee.hire_date)}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{formatDate(employee.departure_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Salary Changes Table */}
          {activeTab === 'salary' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-750">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Employee ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Previous Salary</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Current Salary</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Change</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.salaryChanges.map((change, idx) => {
                    const changePercent = calculateSalaryChange(change.history_salary, change.current_salary);
                    return (
                      <tr key={idx} className="hover:bg-slate-750 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-300">{change.employee_id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">{change.employee_name.charAt(0)}</span>
                            </div>
                            <span className="text-white font-medium">{change.employee_name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">{change.employee_email}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{formatCurrency(change.history_salary)}</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">{formatCurrency(change.current_salary)}</td>
                        <td className="px-6 py-4">
                          <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm flex items-center w-fit">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +{changePercent}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">{formatDate(change.salary_change_date)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Department Changes Table */}
          {activeTab === 'department' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-750">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Employee ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">New Department</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Start Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.departmentChanges.map((change, idx) => (
                    <tr key={idx} className="hover:bg-slate-750 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-300">{change.employee_id}</td>
                      <td className="px-6 py-4">
                        <span className="bg-purple-900 text-purple-300 px-3 py-1 rounded-full text-sm">
                          {getDepartmentName(change.department_id)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{formatDate(change.start_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;