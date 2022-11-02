// import sequelize
import { Sequelize } from "sequelize";
// import connection
import db from "../config/db.config.js";

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
      set(value) {
        this.setDataValue('password', hash(value));
      },
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", hash(this.username + value));
      },
    },
    emailId:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    firstName:{
        type:DataTypes.STRING,
    },
    lastName:{
        type:DataTypes.STRING
    },
    roleId: {
      type: DataTypes.INTEGER,
      allownull: false,
      references: {
        model: "roles",
        key: "id"
      }
    },
  }, {
    //  freeze Table Name
    freezetableName: "true",
    tableName: "users"
  });
 
  // Export model user
  export default User;