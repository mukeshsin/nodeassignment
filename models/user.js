// import sequelize
import { Sequelize } from "sequelize";
// import connection
import db from "../config/db.config.js";
import Role from "./role.js";

const { DataTypes } = Sequelize;
// table define
const User = db.define(
  "users",
  {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },

     image: {
      type: DataTypes.STRING,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allownull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    //  freeze Table Name
    freezetableName: "true",
    tableName: "users",
  }
);

// Export model user
export default User;
