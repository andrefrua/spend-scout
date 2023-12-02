import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import i18nextMiddleware from "./lib/i18n";
import sequelize from "./models/sequelize";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/category";
import transactionRoutes from "./routes/transaction";
import dashboardRoutes from "./routes/dashboard";
import userPreferencesRoutes from "./routes/userPreferences";
import setupAssociations from "./models/associations";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
} else {
  dotenv.config({ path: ".env.production" });
}

const app = express();
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "localhost";

console.log(
  `Environment: ${process.env.NODE_ENV} | Hostname: ${host} | Port: ${port}`
);

app.use(cors());
app.use(express.json());
app.use(i18nextMiddleware);

// Setup Sequelize associations
setupAssociations();

// Synchronize the models with the database
// sequelize.sync({ force: true })  // Force true to recreate the BD
sequelize
  .sync()
  .then(() => {
    app.use(authRoutes);
    app.use(categoryRoutes);
    app.use(transactionRoutes);
    app.use(dashboardRoutes);
    app.use(userPreferencesRoutes);

    app.listen(port, host, () => {
      console.log(`Server running at http://${host}:${port}/`);
    });

    console.log("Database synced successfully.");
  })
  .catch(error => {
    console.log("Error syncing database:", error);
  });
