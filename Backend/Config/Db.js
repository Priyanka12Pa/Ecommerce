import { Sequelize } from "sequelize";
 
const db = new Sequelize('Ecom', 'root', 'root', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;