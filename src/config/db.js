import { Sequelize } from "sequelize";



const sequelize = new Sequelize('Employee_Sequelize', 'postgres', 'ljeng', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  port: 5432 
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

  export default sequelize;