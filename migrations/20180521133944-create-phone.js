'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Phones', {
            iid: {
                allowNull: false,
                primaryKey: true,
                foreignKey: true,
                type: Sequelize.STRING
            },
            hid: {
                allowNull: false,
                primaryKey: true,
                foreignKey: true,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Phones');
    }
};