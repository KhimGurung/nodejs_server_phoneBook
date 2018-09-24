var express = require('express');
var mysql = require('mysql');

var con = mysql.createPool({
  connectionLimit: 1000,
  host: "phonebook--mysql.mysql.database.azure.com", 
  user: "Farzaneh@phonebook--mysql", 
  password: "adminadmin#23", 
  database: "phonebook", 
  port: 3306
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
      con.getConnection(function(error, tempCon){
        if(!!error){
          tempCon.release();
          console.log('Error');
        }else{
          tempCon.query(query, function (err, result) {
            if (err) {
                throw err;
            } else {
                callback(err, result);
            }
          });
        }
      });
    });
}
getRegion = function (callback){
  con.getConnection(function(error, tempCon){
    if(!!error){
      tempCon.release();
      console.log('Error');
    }else{
      tempCon.query("SELECT region FROM selected_region WHERE id=1", function (err, result) {
        if (err) {
            throw err;
        } else {
            var region = result[0].region;
            callback(region);
        }
      });
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

    con.getConnection(function(error, tempCon){
      if(!!error){
        tempCon.release();
        console.log('Error');
      }else{
        tempCon.query(query, function (err, result) {
          if (err) {
              throw err;
          } else {
              callback(err, result);
          }
        });
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
    con.getConnection(function(error, tempCon){
      if(!!error){
        tempCon.release();
        console.log('Error');
      }else{
        tempCon.query(query, function (err, result) {
          if (err) {
              throw err;
          } else {
              callback(err, result);
          }
        });
      }
    });
  });
}
exports.addToImportant = function(id, callback){
  var query = "UPDATE contacts SET ContactImportant = 1 WHERE ContactID = "+id;
  con.getConnection(function(error, tempCon){
    if(!!error){
      tempCon.release();
      console.log('Error');
    }else{
      tempCon.query(query, function (err, result) {
        if (err) {
            throw err;
        } else {
            callback(err, result);
        }
      });
    }
  });
}

exports.removeFromImportant = function(id, callback){
  var query = "UPDATE contacts SET ContactImportant = 0 WHERE ContactID = "+id;
  con.getConnection(function(error, tempCon){
    if(!!error){
      tempCon.release();
      console.log('Error');
    }else{
      tempCon.query(query, function (err, result) {
        if (err) {
            throw err;
        } else {
            callback(result);
        }
      });
    }
  });
}
exports.saveSetting = function(region, callback){
  var query = "UPDATE selected_region SET region = '"+region+"' WHERE id = 1";
  con.getConnection(function(error, tempCon){
    if(!!error){
      tempCon.release();
      console.log('Error');
    }else{
      tempCon.query(query, function (err, result) {
        if (err) {
            throw err;
        } else {
            callback(result);
        }
      });
    }
  });
}
