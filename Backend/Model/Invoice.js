import { Sequelize } from "sequelize";
import db from "../Config/Db.js";
// this is model name not database
const { DataTypes } = Sequelize;
const Invoice = db.define("Invoices", {
  IDs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
   
  },
  
});

(async () => {
  await db.sync();
})();

export default Invoice;