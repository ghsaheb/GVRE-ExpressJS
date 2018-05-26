const RealEstate = require('../models').RealEstate;
const House = require('../models').House;
const request = require('request');

async function getHouses (URL){
    House.destroy({
        where: {
            reid: URL
        },
    });

    const options = {
        url: URL,
        method: 'GET',
        json: true
    };

    let body = await doRequest(options);
    let expireTime = body.expireTime;
    console.log("Get successful");
    for (let i in body.data){
        let house = body.data[i];
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
    let d = new Date;
    setTimeout(function (){getHouses(URL);}, expireTime - d.getTime());
}

function doRequest(options) {
    return new Promise(function (resolve, reject) {
        request(options, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

const functions = {
    async updateRealEstates() {
        const realEstates = await RealEstate.findAll({
            attributes: ['URL']
        });
        for (let i in realEstates){
            getHouses(realEstates[i].URL)
        }
    }
};

module.exports = functions;