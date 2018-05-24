const express = require('express');
const router = express.Router();

const houseDomain = require('../domain/house');

router.get('/', async function(req, res, next) {
    let maxPrice = Number.MAX_SAFE_INTEGER;
    let minArea = 0;
    let dealType = null;
    if (req.param("price")){
        if (req.param("price").toString().match(/^[1-9]\d*$/)){
            maxPrice = req.param("price");
        }
        else {
            res.status(400);
            res.json({message: "Bad Request"});
            return;
        }
    }
    if (req.param("area")){
        if (req.param("area").toString().match(/^[1-9]\d*$/)){
            minArea = req.param("area");
        }
        else {
            res.status(400);
            res.json({message: "Bad Request"});
            return;
        }
    }
    if (req.param("dealType")){
        if (!(req.param("dealType").toString() === "false" || req.param("dealType").toString() === "true")){
            res.status(400);
            res.json({message: "Bad Request"});
            return;
        }
        else if (req.param("dealType").toString() === "false"){
            dealType = 0;
        }
        else dealType = 1;
    }
    if (req.param("buildingType")){
        if (!(req.param("buildingType").toString() === "آپارتمان" || req.param("buildingType").toString() === "ویلایی")){
            res.status(400);
            res.json({message: "Bad Request"});
            return;
        }
    }
    let houses = await houseDomain.getHouses(minArea, dealType, req.param("buildingType"), maxPrice);
    res.status(200);
    res.json(houses);
});

router.post('/', async function(req, res){
    if (!req.body.area ||
        !req.body.buildingType ||
        !req.body.address ||
        !req.body.dealType ||
        !req.body.price){
        res.status(400);
        res.json({message: "Bad Request"});
        return;
    }
    if (!req.body.area.toString().match(/^[1-9]\d*$/)){
        res.status(400);
        res.json({message: "Bad Request"});
        return;
    }
    if (!(req.body.dealType.toString() === "false" || req.body.dealType.toString() === "true")){
        res.status(400);
        res.json({message: "Bad Request"});
        return;
    }
    if (!(req.body.buildingType.toString() === "آپارتمان" || req.body.buildingType.toString() === "ویلایی")){
        res.status(400);
        res.json({message: "Bad Request"});
        return;
    }
    if (req.body.dealType.toString() === "false"){
        if (!req.body.price.sellPrice.toString().match(/^[0-9]\d*$/)){
            res.status(400);
            res.json({message: "Bad Request"});
            return;
        }
    }
    else {
        if (!req.body.price.rentPrice.toString().match(/^[0-9]\d*$/)){
            res.status(400);
            res.json({message: "Bad Request"});
            return;
        }
        if (!req.body.price.sellPrice.toString().match(/^[0-9]\d*$/)){
            res.status(400);
            res.json({message: "Bad Request"});
            return;
        }
    }
    houseDomain.addNewHouse(req.body);
    res.status(201);
    res.json({message: "Created"});
});

router.get('/:house_id', async function(req, res, next) {
    const id = req.params.house_id;
    if (id === null || id === undefined){
        res.status(400);
        res.json({message: "Bad Request"});
        return;
    }
    const house = await houseDomain.findHouse(id);
    if (house === null || house === undefined){
        res.status(404);
        res.json({message: "Not Found"});
        return;
    }
    res.status(200);
    res.json(house);
});


module.exports = router;