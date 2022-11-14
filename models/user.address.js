// import sequelize
import { Sequelize } from "sequelize";
// import connection
import db from "../config/db.config.js";

const { DataTypes } = Sequelize;
// table define
const Address = db.define(
  "addresses",
  {
    id:{
     type:DataTypes.Int,
     allowNull:false,
     autoIncrement:true
    },
      address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    pinCode: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allownull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    //  freeze Table Name
    freezetableName: "true",
    tableName: "addresses",
  }
);

// Export model user
export default Address;

