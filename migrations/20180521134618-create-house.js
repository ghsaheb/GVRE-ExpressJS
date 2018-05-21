'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Houses', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            area: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            buildingType: {
                allowNull: false,
                type: Sequelize.STRING
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING
            },
            imageURL: {
                type: Sequelize.STRING
            },
            dealType: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            basePrice: {
                type: Sequelize.INTEGER
            },
            rentSellPrice: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.STRING
            },
            iid: {
                foreignKey: true,
                type: Sequelize.STRING
            },
            reid: {
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
        return queryInterface.dropTable('Houses');
    }
};