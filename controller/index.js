var express = require('express');
var app = express.Router();
var fs = require('fs');

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

module.exports = app;
