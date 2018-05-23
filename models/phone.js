'use strict';
module.exports = (sequelize, DataTypes) => {
    var Phone = sequelize.define('Phone', {
    }, {});
    Phone.associate = function(models) {
        // associations can be defined here
        Phone.belongsTo(models.Individual, {foreignKey: 'iid'});
        Phone.belongsTo(models.House, {foreignKey: 'hid'});
    };
    return Phone;
};