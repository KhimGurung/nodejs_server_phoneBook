var express = require('express');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: "root",
  database: "phonebook",
  port: 3306,
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

con.connect(function(err) {
  if(err){
    throw err;
  }
  console.log("Connected!");
});

exports.getAllData = function(callback){
    getRegion(function(region){
      var regions = region.split(',');
      if (regions.includes('all')){
        var query = "SELECT * FROM contacts ORDER BY ContactName ASC";
      }else{
        var query = "SELECT * FROM contacts WHERE ContactRegion IN ('"+regions.join("','")+"') ORDER BY ContactName ASC ";
      }
      console.log(query);
      con.query(query, function (err, result) {
        if (err) {
            throw err;
        } else {
            callback(err, result);
        }
      });
    });
}
getRegion = function (callback){
  con.query("SELECT region FROM selected_region WHERE id=1", function (err, result) {
    if (err) {
        throw err;
    } else {
        var region = result[0].region;
        callback(region);
    }
  });
}

exports.searchUser = function(name, callback){
  getRegion(function(region){
    var regions = region.split(',');

    if (regions.includes('all')){
      var query = "SELECT * FROM contacts WHERE ContactName LIKE '%"+name+"%' ORDER BY ContactName ASC ";
    }else{
      var query = "SELECT * FROM contacts WHERE ContactRegion IN ('"+regions.join("','")+"') AND ContactName LIKE '%"+name+"%' ORDER BY ContactName ASC ";
    }
    con.query(query, function (err, result) {
      if (err) {
          throw err;
      } else {
          callback(err, result);
      }
    });
  });
}

exports.getImportantContacts = function(callback){
  getRegion(function(region){
    var regions = region.split(',');
    if (regions.includes('all')){
      var query = "SELECT * FROM contacts WHERE ContactImportant = 1 ORDER BY ContactName ASC ";
    }else{
      var query = "SELECT * FROM contacts WHERE ContactRegion IN ('"+regions.join("','")+"') AND ContactImportant = 1 ORDER BY ContactName ASC ";
    }

    con.query(query, function (err, result) {
      if (err) {
          throw err;
      } else {
          callback(err, result);
      }
    });
  });
}
exports.addToImportant = function(id, callback){
  con.query("UPDATE contacts SET ContactImportant = 1 WHERE ContactID = "+id, function(err, result){
    if(err){
      throw err;
    }else{
      callback(err, result);
    }
  });
}

exports.removeFromImportant = function(id, callback){
  con.query("UPDATE contacts SET ContactImportant = 0 WHERE ContactID = "+id, function(err, result){
    if(err){
      throw err;
    }else{
      callback(result);
    }
  });
}
exports.saveSetting = function(region, callback){
  console.log(region);
  con.query("UPDATE selected_region SET region = '"+region+"' WHERE id = 1", function(err, result){
    if(err){
      throw err;
    }else{
      callback(result);
    }
  });
}
