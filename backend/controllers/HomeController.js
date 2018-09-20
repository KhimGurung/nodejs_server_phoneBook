const express = require('express');

const app = express();

const path = require('path');

const database = require("../model/crud");

exports.getAllData = function(req, res){
	 database.getAllData( function(err, result){
		res.send(conversion(result));
	});
}
 exports.searchUser = function(req, res){
	 database.searchUser(req.params.name, function(err, result, name){
		 res.send(conversion(result));
	 });
 }
 exports.getImportantContacts = function(req, res){
	 database.getImportantContacts(function(err, result){
		 res.send(conversion(result));
	 });
 }
 exports.addToImportant = function(req, res){
	 database.addToImportant(req.params.id, function(err, result){
		 res.send(result);
	 });
 }
 exports.removeFromImportant = function(req, res){
	 database.removeFromImportant(req.params.id, function(result){
		 res.send(result);
	 });
 }
 exports.saveSetting = function(req, res){
	database.saveSetting(req.params.region, function(result){
		res.send(result);
	});
 }

 function conversion(result){
	 for(var i = 0; i < result.length; i++){
		 if(result[i].ContactImage){
			 result[i].ContactImage = new Buffer( result[i].ContactImage, 'binary' ).toString('base64');
		 }
	 }
	 return result;
 }
