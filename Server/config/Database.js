import { Sequelize } from "sequelize";

const db = new Sequelize('auth_db', 'admin', 'SonyBoom2022!', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;