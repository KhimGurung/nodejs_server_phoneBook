const express = require('express');

const router = express.Router();

const home = require('../controllers/HomeController');

// api links for phonebook applicaiton

// route to get all data of selected regions from database.
router.get('/get_selected_region_data', home.getAllData);

// This is for searching data from database according to the name typed. It will start searching soon you started typing.
router.get('/search_contact/:name', home.searchUser);

// this will get all the data that are marked as important, It will have different tab in GUI like iphone contact has for quick access
router.get('/get_important_contacts', home.getImportantContacts);

// It is used to marked the contact as important
router.get('/add_to_important/:id', home.addToImportant);

//it is used to unmarked the contact from important
router.get('/remove_from_important/:id', home.removeFromImportant);
router.get('/save_setting/:region', home.saveSetting);

module.exports = router;
