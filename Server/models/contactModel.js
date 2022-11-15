import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;

export const Contacts = db.define('contacts',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    namn:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    mobile:{
        type: DataTypes.STRING,
        allowNull: true
    },
    persnummer:{
        type: DataTypes.STRING,
        allowNull: true
    },
    ort:{
        type: DataTypes.STRING,
        allowNull: false
    }


   
   
},{
    freezeTableName: false
});

