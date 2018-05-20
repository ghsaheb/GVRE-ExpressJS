'use strict';
module.exports = (sequelize, DataTypes) => {
    var RealEstate = sequelize.define('RealEstate', {
        name: DataTypes.STRING,
        URL: DataTypes.STRING,
    });

    RealEstate.associate = function(models) {
        models.RealEstate.hasMany(models.House);
    };

    return RealEstate;
};