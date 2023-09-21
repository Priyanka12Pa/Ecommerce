import { Sequelize } from "sequelize";
import db from "../Config/Db.js";
// this is model name not database
const { DataTypes } = Sequelize;
const Register = db.define("Register", {
  FirstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Role: {
    type: DataTypes.STRING,
    enum: ["user", "admin"],
    default: "user",
    allowNull: true,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetToken:{
    type: DataTypes.STRING, 
    allowNull: true,
  }
});

(async () => {
  await db.sync();
})();

export default Register;
