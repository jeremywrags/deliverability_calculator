const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL + "?sslmode=no-verify", { })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.deliverabilities = require("./deliverability.model.js")(sequelize, Sequelize);

module.exports = db;