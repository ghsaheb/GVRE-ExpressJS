const Individual = require('../models').Individual;
const Phone = require('../models').Phone;
const request = require('request')

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
            return null;
        }
        const options = {
            url: 'http://139.59.151.5:6664/bank/pay',
            method: 'POST',
            headers: {"api-key": "6688c560-50f1-11e8-8a5f-7d010a8baae7"},
            json: {"userId": individual.username, "value": amount}
        };
        let result = await functions.doRequest(options);
        if (!(result.result === 'OK')) return false;
        Individual.findOne({
            where: {
                username: username
            }
        }).then(individual => {
            return individual.increment([ 'credit' ], {by: amount})
        }).then(/* ... */);
        return true;
    },

    doRequest(options) {
        return new Promise(function (resolve, reject) {
            request(options, function (error, res, body) {
                if (!error && res.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
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