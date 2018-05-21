'use strict';
module.exports = (sequelize, DataTypes) => {
    var RealEstate = sequelize.define('RealEstate', {
        name: DataTypes.STRING,
        URL: DataTypes.STRING
    }, {});
    RealEstate.associate = function(models) {
        // associations can be defined here
    };
    return RealEstate;
};