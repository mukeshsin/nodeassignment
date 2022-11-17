const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.HOST,
  password: dbConfig.password,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.roles = require("/role.js")(sequelize, Sequelize);
db.users = require("/user.js")(sequelize, Sequelize);
db.addresses = require("/address.js")(sequelize, Sequelize);

//relational between users and addresses
db.users.hasMany(db.addresses, { foreignKey: "userId", as: "addressDetails" });
db.addresses.belongsTo(db.users, {
  foreignKey: "userId",
  as: "userWithAddress",
});

module.exports = db;
