var express = require('express');
var app = express.Router();
var jwt = require('jwt-simple');
var moment = require('moment');
var fs = require('fs');
var config = {};
config.TOKEN_SECRET = process.env.TOKEN_SECRET || 'nk235jaih535lhgdszhdfb-89ddsaj';

  app.get("/getAllCategory",function (req,res) {
    fs.readFile("./json/allCategory.json", 'utf8', function(err, data) {
        if (err) throw err;
        var temp = JSON.parse(data);
        res.send({"allCategory":temp['category']});
    });
  });

  app.get("/getCategoryData/:categoryId",function (req,res) {
    fs.readFile("./json/allCategory.json", 'utf8', function(err, data) {
        if (err) throw err;
        var temp = JSON.parse(data)['subCategory'];
        if (temp[req.params.categoryId]!==undefined) {
          res.send({"allCategory":temp[req.params.categoryId],"catId":req.params.categoryId});
        }else {
          res.status(404).send({"allCategory":null,"catId":req.params.categoryId});
        }
    });
  });
app.post("/login",function(req,res){
	var crdtl = req.body;
	console.log(crdtl)
	if(crdtl.username==="admin"&& crdtl.password==="password"){
	var payload = {
        	sub: crdtl.username,
        	iat: moment().unix(),
        	exp: moment().add(14, 'minutes').unix()
    	};
    
	res.send({"message":"User Logged in Successfully","token":jwt.encode(payload, config.TOKEN_SECRET)});
	}else{
	res.status(401).send({"message":"User not Exist","token":null});
	}
});

module.exports = app;
