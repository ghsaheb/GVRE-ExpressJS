const Individual = require('../models').Individual;
const Phone = require('../models').Phone;

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
    },

    async findPhone(username, id){
        const phone = await Phone.findOne({
            where: {
                iid: username,
                hid: id
            }
        });
        return phone;
    },

    async isPaidForPhone(username, id) {
        const individual = await functions.getIndividual(username);
        if (individual === null || individual === undefined){
            return null;
        }
        const phone = await functions.findPhone(username, id);
        return !(phone === null || phone === undefined);
    },

    async payForPhone(username, id) {
        const individual = await functions.getIndividual(username);
        if (individual === null || individual === undefined){
            return null;
        }
        const paid = await functions.isPaidForPhone(username, id);
        if (paid === true) return true;
        const credit = await functions.getCredit(username);
        if (credit < 1000) return false;
        Individual.findOne({
            where: {
                username: username
            }
        }).then(individual => {
            return individual.decrement([ 'credit' ], {by: 1000})
        }).then(/* ... */);
        await Phone.create({hid: id, iid: username});
        return true;
    }
};

module.exports = functions;