const RealEstate = require('../models').RealEstate;
const House = require('../models').House;
const request = require('request')

const functions = {
    async getHouses(URL) {
        const options = {
            url: URL,
            method: 'GET',
            json: true
        };

        await request(options, function(err, res, body) {
            for (let i in body.data){
                let house = body.data[i];
                console.log("Get successful");
                if (house.dealType === 0){
                    House.create({
                        hid: house.id,
                        area: house.area,
                        buildingType: house.buildingType,
                        address: house.address,
                        imageURL: house.imageURL,
                        dealType: false,
                        basePrice: null,
                        rentSellPrice: house.price.sellPrice,
                        description: house.description,
                        reid: URL
                    });
                }
                else {
                    House.create({
                        hid: house.id,
                        area: house.area,
                        buildingType: house.buildingType,
                        address: house.address,
                        imageURL: house.imageURL,
                        dealType: true,
                        basePrice: house.price.basePrice,
                        rentSellPrice: house.price.rentPrice,
                        description: house.description,
                        reid: URL
                    });
                }
            }
        });
    },

    async updateRealEstates() {
        const realEstates = await RealEstate.findAll({
            attributes: ['URL']
        });
        for (let i in realEstates){
            functions.getHouses(realEstates[i].URL)
        }
    }
};

module.exports = functions;