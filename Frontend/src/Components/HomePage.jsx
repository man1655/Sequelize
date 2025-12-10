import React from 'react';
import { TrendingUp, Users, Briefcase, DollarSign, Award, Clock, ArrowRight, BarChart3, FileText, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
const HRHomePage = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-blue-600 p-2.5 rounded-lg shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">HR Analytics Dashboard</h1>
              </div>
              <p className="text-slate-400 mt-2 text-lg">Comprehensive workforce insights and intelligent reporting</p>
            </div>
            <div className="flex items-center space-x-3 bg-slate-700 px-5 py-3 rounded-lg border border-slate-600">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-slate-200 font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Welcome Section */}
        <div className="bg-slate-800 rounded-xl shadow-xl p-8 mb-10 border border-slate-700">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 p-3 rounded-lg shadow-lg">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Welcome to HR Business Reports
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                Access comprehensive analytics and insights about your workforce. Our dashboard provides detailed reports on budget utilization, 
                employee career progression, and project resource allocation to help you make data-driven HR decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          
          {/* Department Budget Utilization Card */}
          <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden hover:border-blue-500 transition-all">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-14 h-14 text-white" />
                <div className="bg-white bg-opacity-20 rounded-lg p-2.5">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Department Budget Utilization
              </h3>
            </div>
            <div className="p-6">
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Track and analyze total salary expenditure per department, budget utilization percentages, and identify departments that are over or under budget.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Total salary expenditure per department</span>
                </div>
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Budget utilization percentage</span>
                </div>
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Over/under budget flags</span>
                </div>
              </div>
              <Link to='/Monthly-Report' className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 px-4 rounded-lg flex items-center justify-center transition-colors shadow-lg">
                View Monthly Report
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>

          {/* Employee Career Progression Card */}
          <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden hover:border-green-500 transition-all">
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-8">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-14 h-14 text-white" />
                <div className="bg-white bg-opacity-20 rounded-lg p-2.5">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Employee Career Progression
              </h3>
            </div>
            <div className="p-6">
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Analyze employee career growth patterns, average promotion timelines, identify common career paths, and understand skill correlations with advancement.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Average time between promotions</span>
                </div>
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Common career paths analysis</span>
                </div>
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Skills correlation with progression</span>
                </div>
              </div>
              <Link to='/Skill-Inventory' className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 px-4 rounded-lg flex items-center justify-center transition-colors shadow-lg">
                View Department Report
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>

          {/* Project Resource Allocation Card */}
          <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden hover:border-purple-500 transition-all">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 pb-16">
              <div className="flex items-center justify-between mb-4">
                <Briefcase className="w-14 h-14 text-white" />
                <div className="bg-white bg-opacity-20 rounded-lg p-2.5">
                  <Users className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Project Resource Allocation
              </h3>
            </div>
            <div className="p-6">
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Monitor project workload distribution, identify overburdened or underutilized employees, and view comprehensive department-wise resource allocation.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Employees with highest project load</span>
                </div>
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Underutilized employees tracking</span>
                </div>
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Department-wise resource distribution</span>
                </div>
              </div>
              <Link to='/Department-Report' className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 px-4 rounded-lg flex items-center justify-center transition-colors shadow-lg">
                View Skills Report
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <Activity className="w-5 h-5 text-white" />
            </div>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="flex items-center p-5 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all border border-slate-600 hover:border-blue-500">
              <div className="bg-blue-600 p-3 rounded-lg mr-4 shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-base">Generate Full Report</p>
                <p className="text-sm text-slate-400 mt-1">Export all analytics</p>
              </div>
            </button>
            <button className="flex items-center p-5 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all border border-slate-600 hover:border-green-500">
              <div className="bg-green-600 p-3 rounded-lg mr-4 shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-base">View Dashboard</p>
                <p className="text-sm text-slate-400 mt-1">Interactive analytics</p>
              </div>
            </button>
            <button className="flex items-center p-5 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all border border-slate-600 hover:border-purple-500">
              <div className="bg-purple-600 p-3 rounded-lg mr-4 shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-base">Team Overview</p>
                <p className="text-sm text-slate-400 mt-1">Employee insights</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRHomePage;