import dotenv from "dotenv";
import { Sequelize } from "sequelize";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
} else {
  dotenv.config({ path: ".env.production" });
}

// Determine the environment (development by default)
const env = process.env.NODE_ENV || "development";

console.log(
  `postgres://postgres:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);
const databaseUrl =
  env === "production"
    ? `postgres://postgres:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`
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
