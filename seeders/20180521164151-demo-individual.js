'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        // return queryInterface.bulkInsert('Individuals', [{
        //     username: 'Bugs',
        //     name: 'بهنام همایون',
        //     phone: '09123456789',
        //     credit: 0,
        //     password: 'Bunny'
        // }], {});
        var models = require ('../models');
        return models.Individual.bulkCreate ([
            {
                username: 'Bugs',
                name: 'بهنام همایون',
                phone: '09123456789',
                credit: 0,
                password: 'Bunny'
            }
        ]);
    },

    down: (queryInterface, Sequelize) => {
          return queryInterface.bulkDelete('Individuals', null, {});
    }
};
