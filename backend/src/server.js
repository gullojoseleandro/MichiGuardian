require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const app = express();
const routes = require("./routes");

const BACKEND_URL = process.env.BACKEND_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: FRONTEND_URL }));

sequelize.authenticate()
  .then(() => console.log("✅ Conexión a MySQL establecida"))
  .catch((err) => console.error("❌ Error al conectar a MySQL:", err));

app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: ${BACKEND_URL}`);
});
