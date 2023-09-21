import { Sequelize } from "sequelize";
import db from "../Config/Db.js";
// this is model name not database
const { DataTypes } = Sequelize;
const Products = db.define("Product", {
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Title: {
    type: DataTypes.STRING,
   
  },
  Price:{
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Couponcode: {
    type: DataTypes.STRING
  },
  ProductImage:{
    type: DataTypes.STRING
  },
});

(async () => {
  await db.sync();
})();

export default Products;