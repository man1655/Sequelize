import React from 'react';
import { TrendingUp, Users, Briefcase, DollarSign, Award, Clock, ArrowRight, BarChart3, FileText, Activity, UserPlus, UserMinus, Target, PieChart } from 'lucide-react';
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
                <h1 className="text-4xl font-bold text-white">HR Business Reports & Analytics</h1>
              </div>
              <p className="text-slate-400 mt-2 text-lg">Comprehensive business intelligence for strategic HR decisions</p>
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
                Advanced HR Reporting Suite
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                Access comprehensive business reports including monthly HR analytics, skills inventory analysis, and compensation insights. 
                Generate data-driven reports to optimize workforce management and strategic planning.
              </p>
            </div>
          </div>
        </div>

        {/* Report Cards - Updated for Task 6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          
          {/* Monthly HR Report Card */}
          <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden hover:border-blue-500 transition-all">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-14 h-14 text-white" />
                <div className="bg-white bg-opacity-20 rounded-lg p-2.5">
                  <UserPlus className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Monthly HR Report
              </h3>
            </div>
            <div className="p-6">
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Comprehensive monthly overview of workforce changes including new hires, departures, salary adjustments, and department transfers.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-1.5"></div>
                  <span>New hires analysis & onboarding trends</span>
                </div>
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Departures & retention statistics</span>
                </div>
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Salary & department change tracking</span>
                </div>
              </div>
              <Link to='/Monthly-Report' className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 px-4 rounded-lg flex items-center justify-center transition-colors shadow-lg">
                Generate Monthly Report
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>

          {/* Skills Inventory Card */}
          <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden hover:border-green-500 transition-all">
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-8">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-14 h-14 text-white" />
                <div className="bg-white bg-opacity-20 rounded-lg p-2.5">
                  <Target className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Skills Inventory
              </h3>
            </div>
            <div className="p-6">
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Analyze organizational skills distribution, identify critical gaps, and understand skill prevalence across departments.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Most common & rare skills identification</span>
                </div>
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Departmental skill gap analysis</span>
                </div>
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Skill development recommendations</span>
                </div>
              </div>
              
              <Link to='/Department-Report' className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 px-4 rounded-lg flex items-center justify-center transition-colors shadow-lg">
                View Skills Inventory
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>

          {/* Compensation Analysis Card */}
          <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden hover:border-purple-500 transition-all">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 pb-16">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-14 h-14 text-white" />
                <div className="bg-white bg-opacity-20 rounded-lg p-2.5">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Compensation Analysis
              </h3>
            </div>
            <div className="p-6">
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Comprehensive compensation analysis including salary bands, bonus eligibility, and promotion recommendations.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Salary bands by position & level</span>
                </div>
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Bonus eligibility & payout analysis</span>
                </div>
                <div className="flex items-start text-sm text-slate-300 bg-slate-700 bg-opacity-50 p-3 rounded-lg border border-slate-600">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 mt-1.5"></div>
                  <span>Promotion & compensation recommendations</span>
                </div>
              </div>
              <Link to='/Skill-Inventory' className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 px-4 rounded-lg flex items-center justify-center transition-colors shadow-lg">
                Analyze Compensation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Report Metrics Summary */}
        <div className="bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700 mb-10">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            Key Report Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-blue-500 transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-3 rounded-lg mr-4 shadow-lg">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">45</p>
                  <p className="text-sm text-slate-400">New Hires (Last 30 Days)</p>
                </div>
              </div>
              <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-green-500 transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 p-3 rounded-lg mr-4 shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">23</p>
                  <p className="text-sm text-slate-400">Critical Skill Gaps</p>
                </div>
              </div>
              <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-purple-500 transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-purple-600 p-3 rounded-lg mr-4 shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">$4.2M</p>
                  <p className="text-sm text-slate-400">Total Bonus Pool</p>
                </div>
              </div>
              <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Updated */}
        <div className="bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <Activity className="w-5 h-5 text-white" />
            </div>
            Report Generation Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="flex items-center p-5 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all border border-slate-600 hover:border-blue-500">
              <div className="bg-blue-600 p-3 rounded-lg mr-4 shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-base">Generate All Reports</p>
                <p className="text-sm text-slate-400 mt-1">Complete analytics package</p>
              </div>
            </button>
            <button className="flex items-center p-5 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all border border-slate-600 hover:border-green-500">
              <div className="bg-green-600 p-3 rounded-lg mr-4 shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-base">Custom Report Builder</p>
                <p className="text-sm text-slate-400 mt-1">Tailored analytics</p>
              </div>
            </button>
            <button className="flex items-center p-5 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all border border-slate-600 hover:border-purple-500">
              <div className="bg-purple-600 p-3 rounded-lg mr-4 shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-base">Export to PDF/Excel</p>
                <p className="text-sm text-slate-400 mt-1">Shareable formats</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRHomePage;