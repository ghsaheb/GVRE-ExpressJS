const express = require('express');
const router = express.Router();

const individualDomain = require('../domain/individual');

router.get('/', async function(req, res, next) {
    if (!req.param("userId") || !req.param("id")){
        res.status(400);
        res.json({message: "Bad Request"});
    }
    else {
        const userId = req.param("userId");
        const id = req.param("id");
        const result = await individualDomain.isPaidForPhone(userId, id);
        if (result === true){
            res.status(200);
            res.json({message: "Ok"});
        }
        else if (result === false) {
            res.status(403);
            res.json({message: "Forbidden"});
        }
        else {
            res.status(404);
            res.json({message: "Not Found"});
        }
    }
});

router.put('/', async function(req, res){
    if (!req.body.userId ||
        !req.body.id){
        res.status(400);
        res.json({message: "Bad Request"});
    }
    else {
        const userId = req.body.userId;
        const id = req.body.id;
        const result = await individualDomain.payForPhone(userId, id);
        if (result === true){
            res.status(200);
            res.json({message: "Ok"});
        }
        else if (result === false){
            res.status(406);
            res.json({message: "Not Acceptable"});
        }
        else {
            res.status(404);
            res.json({message: "Not Found"});
        }
    }
});

module.exports = router;