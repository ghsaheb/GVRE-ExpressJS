'use strict';
module.exports = (sequelize, DataTypes) => {
    var House = sequelize.define('House', {
        id: DataTypes.STRING,
        area: DataTypes.INTEGER,
        buildingType: DataTypes.STRING,
        address: DataTypes.STRING,
        imageURL: DataTypes.STRING,
        dealType: DataTypes.STRING,
        basePrice: DataTypes.INTEGER,
        rentSellPrice: DataTypes.INTEGER,
        phone: DataTypes.STRING,
        description: DataTypes.STRING
    });

    // House.associate = function(models) {
    //     models.House.hasMany(models.Task);
    // };

    return House;
};