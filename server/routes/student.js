const express = require('express');
const router = express.Router();
const studentsController = require("../controller/studentsController");

//View all records
router.get('/',studentsController.views);


//Add new records
router.get('/adduser',studentsController.adduser);
router.post('/adduser',studentsController.save);


//Edit records
router.get('/edituser/:id',studentsController.edituser);
router.post('/edituser/:id',studentsController.edit);


//Delete records
router.get('/deleteuser/:id',studentsController.deleteuser);


//To connect main Module
module.exports = router;
