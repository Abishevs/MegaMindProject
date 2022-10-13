module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define("users", {
        name:{
            type: DataTypes.STRING,
            allowNull: false 
        },  
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return users;
};