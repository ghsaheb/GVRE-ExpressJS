const Individual = require('../models').Individual;

const functions = {
    async getIndividual(username) {
        const individual = await Individual.findOne({
            where: {
                username: username
            }
        });
        return individual;
    },

    async getCredit(username) {
        const individual = await functions.getIndividual(username);
        if (individual === null || individual === undefined){
            return null;
        }
        return individual.credit;
    },

    async updateCredit(username, amount) {
        const individual = await functions.getIndividual(username);
        if (individual === null || individual === undefined){
            return false;
        }
        Individual.findOne({
            where: {
                username: username
            }
        }).then(individual => {
            return individual.increment([ 'credit' ], {by: amount})
        }).then(/* ... */);
        return true;
    }
};

module.exports = functions;