// const dbConfig = require("../config/db.config.js");
// const Sequelize = require("sequelize");
// const { default: User } = require("./user.js");
// const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
//   host: dbConfig.HOST,
//   password: dbConfig.password,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });
// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.roles = require("/role.js")(sequelize, Sequelize);
// db.users = require("/user.js")(sequelize, Sequelize);
// db.addresses = require("/address.js")(sequelize, Sequelize);

// //relational between users and addresses
//  User.hasMany(Address,{foreignKey: 'userId',as:addressDetails});

 
// // //db.users.hasMany(db.addresses);

// // User.associate = function(models) {
// //   User.hasMany(Address, { 
// //       foreignKey : "userId",
// //       as: 'addresses' 
// //   });


// module.exports = db;

import Address from "./address.js";
import User from "./user.js";
User.hasMany(Address, {
  as: 'addressDetails'
});
Address.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default { User, Address };