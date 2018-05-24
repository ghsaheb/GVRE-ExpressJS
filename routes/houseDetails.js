const express = require('express');
const router = express.Router();

const houseDomain = require('../domain/house');
const realEstateDomain = require('../domain/realestate');

router.get('/', async function(req, res, next) {
    // if (id === null || id === undefined){
    //     res.status(400);
    //     res.json({message: "Bad Request"});
    //     return;
    // }
    // house = houseDomain.findHouse(id);
    // if (house === null || house === undefined){
    //     res.status(404);
    //     res.json({message: "Not Found"});
    //     return;
    // }
    await realEstateDomain.updateRealEstates();
    res.status(200);
    res.json({});
});

module.exports = router;