// import sequelize
import { Sequelize } from "sequelize";
// import connection
import db from "../config/db.config.js";

const { DataTypes } = Sequelize;
// table define
const Role = db.define(
  "roles",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    // Freeze Table Name
    freezeTableName: true,
  }
);

// Export user
export default Role;
