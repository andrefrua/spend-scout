import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import i18nextMiddleware from "./lib/i18n";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/category";
import transactionRoutes from "./routes/transaction";
import dashboardRoutes from "./routes/dashboard";
import sequelize from "./models/sequelize";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
} else {
  dotenv.config({ path: ".env.production" });
}

const app = express();
const port = Number(process.env.PORT);
const hostname = process.env.HOSTNAME || "localhost";

console.log(hostname);

app.use(cors());
app.use(express.json());
app.use(i18nextMiddleware);

// Synchronize the models with the database
// sequelize.sync({ force: true })  // Force true to recreate the BD
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch(error => {
    console.log("Error syncing database:", error);
  });

app.use(authRoutes);
app.use(categoryRoutes);
app.use(transactionRoutes);
app.use(dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
