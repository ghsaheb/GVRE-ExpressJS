const House = require('../models').House;
const Individual = require('../models').Individual;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const uuidv4 = require('uuid/v4');
const request = require('request')

const functions = {
    async reformatHouses(houses) {
        for (let i in houses){
            houses[i].dataValues.id = houses[i].hid;
            delete houses[i].dataValues["hid"];
            if (houses[i].dataValues.dealType){
                let price = {
                    "sellPrice": 0,
                    "rentPrice": houses[i].dataValues.rentSellPrice,
                    "basePrice": houses[i].dataValues.basePrice
                };
                houses[i].dataValues.price = price;
            }
            else {
                let price = {
                    "sellPrice": houses[i].dataValues.rentSellPrice,
                    "rentPrice": 0,
                    "basePrice": 0
                };
                houses[i].dataValues.price = price;
            }
            delete houses[i].dataValues.rentSellPrice;
            delete houses[i].dataValues.basePrice;
        }
        return houses;
    },

    async reformatHouse(house) {
        house.dataValues.id = house.hid;
        delete house.dataValues["hid"];
        if (house.dataValues.dealType){
            let price = {
                "sellPrice": 0,
                "rentPrice": house.dataValues.rentSellPrice,
                "basePrice": house.dataValues.basePrice
            };
            house.dataValues.price = price;
        }
        else {
            let price = {
                "sellPrice": house.dataValues.rentSellPrice,
                "rentPrice": 0,
                "basePrice": 0
            };
            house.dataValues.price = price;
        }
        delete house.dataValues.rentSellPrice;
        delete house.dataValues.basePrice;
        delete house.dataValues.reid;
        delete house.dataValues.iid;
        return house;
    },

    async getHouses(area, dealType, buildingType, maxPrice) {
        if (dealType === null || dealType === undefined){
            if (buildingType === null || buildingType === undefined){
                const houses = await House.findAll({
                    attributes: ['hid', 'area', 'buildingType', 'address', 'imageURL',
                        'dealType', 'basePrice', 'rentSellPrice', 'description'],
                    where: {
                        area: {
                            [Op.gte]: area
                        },
                        rentSellPrice: {
                            [Op.lte]: maxPrice
                        }
                    }
                });
                return await functions.reformatHouses(houses);
            }
            else {
                const houses = await House.findAll({
                    attributes: ['hid', 'area', 'buildingType', 'address', 'imageURL',
                        'dealType', 'basePrice', 'rentSellPrice', 'description'],
                    where: {
                        area: {
                            [Op.gte]: area
                        },
                        rentSellPrice: {
                            [Op.lte]: maxPrice
                        },
                        buildingType: buildingType
                    }
                });
                return await functions.reformatHouses(houses);
            }
        }
        else {
            if (buildingType === null || buildingType === undefined){
                const houses = await House.findAll({
                    attributes: ['hid', 'area', 'buildingType', 'address', 'imageURL',
                        'dealType', 'basePrice', 'rentSellPrice', 'description'],
                    where: {
                        area: {
                            [Op.gte]: area
                        },
                        rentSellPrice: {
                            [Op.lte]: maxPrice
                        },
                        dealType: dealType
                    }
                });
                return await functions.reformatHouses(houses);
            }
            else {
                const houses = await House.findAll({
                    attributes: ['hid', 'area', 'buildingType', 'address', 'imageURL',
                        'dealType', 'basePrice', 'rentSellPrice', 'description'],
                    where: {
                        area: {
                            [Op.gte]: area
                        },
                        rentSellPrice: {
                            [Op.lte]: maxPrice
                        },
                        dealType: dealType,
                        buildingType: buildingType
                    }
                });
                return await functions.reformatHouses(houses);
            }
        }
    },

    async findHouse(id) {
        const house = await House.findOne({
            attributes: ['hid', 'area', 'buildingType', 'address', 'imageURL',
                'dealType', 'basePrice', 'rentSellPrice', 'description', 'iid', 'reid'],
            where: {
                hid: id
            }
        });
        if (house === null || house === undefined) return null;
        if (house.reid === null || house.reid === undefined) {
            const owner = await Individual.findOne({
                where: {
                    username: house.iid
                }
            });
            house.dataValues.phone = owner.phone;
            return await functions.reformatHouse(house);
        }
        else {
            const options = {
                url: house.reid + '/' + id,
                method: 'GET',
                json: true
            };
            let result = null;
            result = await functions.doRequest(options);
            return result.data;
        }
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

    async addNewHouse(house) {
        if (house.dealType === "false"){
            House.create({
                hid: uuidv4(),
                area: house.area,
                buildingType: house.buildingType,
                address: house.address,
                imageURL: house.imageURL,
                dealType: false,
                basePrice: null,
                rentSellPrice: house.price.sellPrice,
                description: house.description,
                iid: "Bugs"
            });
        }
        else {
            House.create({
                hid: uuidv4(),
                area: house.area,
                buildingType: house.buildingType,
                address: house.address,
                imageURL: house.imageURL,
                dealType: true,
                basePrice: house.price.basePrice,
                rentSellPrice: house.price.rentPrice,
                description: house.description,
                iid: "Bugs"
            });
        }
    }
};

module.exports = functions;