import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import "./contactModel.js"
const { DataTypes } = Sequelize;
 
export const Users = db.define('users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    fullname:{
        type: DataTypes.STRING,
        allowNull: false
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
    active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{ 
    freezeTableName: true
});

export const Roles = db.define('roles',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    role:{
        type: DataTypes.STRING,
        allowNull: false
    }
   
   
},{
    freezeTableName: true
});

export const UserRoles = db.define('user_roles',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    }
    
   
   
},{
    freezeTableName: true
});
(async () => {
    Users.belongsToMany(Roles, { through: UserRoles, foreignKey: 'id_user'})
    Roles.belongsToMany(Users, { through: UserRoles, foreignKey: 'id_roles'})
})();

(async () => {
    
    await db.sync();
})();


