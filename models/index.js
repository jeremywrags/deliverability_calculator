const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL + "?sslmode=no-verify", { })


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.deliverabilityConfgs = require("./deliverabilityConfig.model.js")(sequelize, Sequelize);
db.deliverabilityPackages = require("./deliverabilityPackage.model.js")(sequelize, Sequelize);
db.deliverabilitySpecs = require("./deliverabilitySpec.model.js")(sequelize, Sequelize);

module.exports = db;