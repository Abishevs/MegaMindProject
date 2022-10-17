import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Users = db.define('users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,

    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    roles:{
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    refresh_token:{
        type: DataTypes.TEXT,
        
    }
},{
    freezeTableName: true
});
 
(async () => {
    await db.sync();
})();
 
export default Users;