'use strict';
module.exports = (sequelize, DataTypes) => {
    var Individual = sequelize.define('Individual', {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        credit: DataTypes.INTEGER,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    });

    Individual.associate = function(models) {
        models.Individual.hasMany(models.House);
    };

    return Individual;
};