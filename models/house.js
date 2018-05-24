'use strict';
module.exports = (sequelize, DataTypes) => {
    var House = sequelize.define('House', {
        hid: DataTypes.STRING,
        area: DataTypes.INTEGER,
        buildingType: DataTypes.STRING,
        address: DataTypes.STRING,
        imageURL: DataTypes.STRING,
        dealType: DataTypes.BOOLEAN,
        basePrice: DataTypes.INTEGER,
        rentSellPrice: DataTypes.INTEGER,
        description: DataTypes.STRING
    }, {});
    House.associate = function(models) {
        // associations can be defined here
        House.belongsTo(models.Individual, {foreignKey: 'iid'});
        House.belongsTo(models.RealEstate, {foreignKey: 'reid'});
    };
    return House;
};