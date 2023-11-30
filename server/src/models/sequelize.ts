import { Sequelize } from "sequelize";

// Determine the environment (development by default)
const env = process.env.NODE_ENV || "development";

const databaseUrl =
  env === "production"
    ? "postgres://postgres:AR_postgres@localhost:5432/spend-scout-prod"
    : "postgres://postgres:AR_postgres@localhost:5432/spend-scout";

console.info(`STARTING IN "${env}" MODE!`);

const sequelize = new Sequelize(databaseUrl);

// // Synchronize the models with the database
// // sequelize.sync({ force: true })  // Force true to recreate the BD
// sequelize.sync()
//   .then(() => {
//     console.log('Database synced successfully.');
//   })
//   .catch((error) => {
//     console.log('Error syncing database:', error);
//   });

export default sequelize;
