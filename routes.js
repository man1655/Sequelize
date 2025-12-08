import express from 'express'
// import EmployeeRoutes from './src/routes/employee.routes.js'
// import AnalyticsRoutes from './src/routes/employee.analytics.routes.js'
// import AggregationRoutes from './src/routes/aggregation.routes.js'
import ReportsRoutes from './src/routes/business.reports.routes.js'


const Router=express.Router();

// // Router.use('/employee',EmployeeRoutes);
// // Router.use('/analytics',AnalyticsRoutes);
// // Router.use('/aggregation',AggregationRoutes)
Router.use('/reports',ReportsRoutes)



export default Router;