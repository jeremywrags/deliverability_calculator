var express = require('express');
var router = express.Router();


const deliverabilties = require("../controllers/deliverability.controller.js");
    
// Create a new Tutorial
router.post("/", deliverabilties.create);

// Retrieve all Tutorials
router.get("/", deliverabilties.findAll);

// Retrieve all published Tutorials
router.get("/published", deliverabilties.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", deliverabilties.findOne);

// Update a Tutorial with id
router.put("/:id", deliverabilties.update);

// Delete a Tutorial with id
router.delete("/:id", deliverabilties.delete);

// Create a new Tutorial
router.delete("/", deliverabilties.deleteAll);

module.exports = router;

