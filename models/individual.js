const Individual = sequelize.define('individual', {
    name: {
        type: sequelize.STRING
    },
    phone: {
        type: sequelize.STRING
    },
    credit: {
        type: sequelize.INT
    },
    username: {
        type: sequelize.STRING
    },
    password: {
        type: sequelize.STRING
    },
}