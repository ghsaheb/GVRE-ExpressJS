'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        // return queryInterface.bulkInsert('RealEstates', [{
        //   name: 'khaneBeDoosh',
        //   URL: 'http://139.59.151.5:6664/khaneBeDoosh/v2/house'
        // }], {});
        var models = require ('../models');
        return models.RealEstate.bulkCreate ([
            {
              name: 'khaneBeDoosh',
              URL: 'http://139.59.151.5:6664/khaneBeDoosh/v2/house'
            }
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('RealEstates', null, {});
    }
};
