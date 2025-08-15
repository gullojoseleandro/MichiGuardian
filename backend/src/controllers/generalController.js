const sequelize = require('../config/db');

const VERSION = (() => {
  try {
    const versionPath = path.resolve(__dirname, "../../VERSION");
    return fs.readFileSync(versionPath, "utf8").trim();
  } catch (e) {
    return require("../../package.json").version;
  }
})();

const getApiHealth = async (req, res) => {
    try {
      await sequelize.authenticate();
      res.status(200).json({
        message: "Bienvenido al backend de MichiGuardian, miau!",
        status: ":)",
        version: VERSION,
        environment: process.env.NODE_ENV || "development",
        database: ":)",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("No se pudo conectar a la DB, miau :(.", error);
      res.status(503).json({
        message: "API de MichiGuardian con problemas, miau :(",
        status: ":(",
        version: VERSION,
        environment: process.env.NODE_ENV || "development",
        database: ":(",
        timestamp: new Date().toISOString(),
      });
    }
  };
  
  module.exports = {
    getApiHealth,
  };
  