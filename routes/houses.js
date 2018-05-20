var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gvre.sqlite');

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS \"individual\" (\n" +
        "  \"username\" char PRIMARY KEY NOT NULL,\n" +
        "  \"credit\" integer(128) NOT NULL,\n" +
        "  \"password\" char(128) NOT NULL,\n" +
        "  \"phone\" char(128) NOT NULL,\n" +
        "  \"name\" char(128) NOT NULL\n" +
        ");");
    // var stmt = db.prepare('INSERT INTO individual (username,credit,password,phone,name) VALUES (?,?,?,?,?)');
    //   stmt.run("Bugs",0,"Bunny","09123456789","بهنام همایون");
    // stmt.finalize();

});
// db.close();

router.get('/', function(req, res, next) {
    var userId = req.param("userId");
    db.get('SELECT * FROM individual I WHERE I.username= ? ;', [userId], function (err, row) {
        if (!row) {
            res.status(404);
            res.json({message: "Not Found"});
        } else {
            res.json({userId: userId, credit: row.credit});
        }
    });
});

router.put('/', function(req, res){
    if(!req.body.userId ||
        !req.body.amount.toString().match(/^[1-9]\d*$/)){
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        var userId = req.body.userId;
        var amount = req.body.amount;
        db.run("UPDATE individual set credit =  credit + ? where username= ? ;", [amount, userId], function(err) {
            res.json({message: "Updated"});
            if (err) {
                res.status(400);
                res.json({message: "Bad Request"});
            }
        });
    }
});

module.exports = router;