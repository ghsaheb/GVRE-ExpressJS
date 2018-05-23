const express = require('express');
const router = express.Router();

const individualDomain = require('../domain/individual');

router.get('/', async function(req, res, next) {
    if (!req.param("userId")){
        res.status(400);
        res.json({message: "Bad Request"});
    }
    else {
        const userId = req.param("userId");
        const credit = await individualDomain.getCredit(userId);
        if (credit === null || credit === undefined){
            res.status(404);
            res.json({message: "Not Found"});
        }
        else {
            res.json({userId: userId, credit: credit});
        }
    }
});

router.put('/', async function(req, res){
    if (!req.body.userId ||
        !req.body.amount.toString().match(/^[1-9]\d*$/)){
        res.status(400);
        res.json({message: "Bad Request"});
    }
    else {
        const userId = req.body.userId;
        const amount = req.body.amount;
        const result = await individualDomain.updateCredit(userId, amount);
        if (result){
            res.status(200);
            res.json({message: "Ok"});
        }
        else {
            res.status(404);
            res.json({message: "Not Found"});
        }
    }
});

module.exports = router;