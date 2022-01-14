var express = require('express');
var router = express.Router();


const deliverabiltyConfig = require("../controllers/deliverabilityConfig.controller.js");
const deliverabiltyPackage = require("../controllers/deliverabilityPackage.controller.js");
const deliverabilitySpec = require("../controllers/deliverabilitySpec.controller.js");

// Create a new Tutorial
router.post("/config", deliverabiltyConfig.create);
router.post("/package", deliverabiltyPackage.create);
router.post("/spec", deliverabilitySpec.create);

// Retrieve all Tutorials
router.get("/config", deliverabiltyConfig.findAll);
router.get("/package", deliverabiltyPackage.findAll);
router.get("/spec", deliverabilitySpec.findAll);

// Retrieve a single Tutorial with id
router.get("/config/:id", deliverabiltyConfig.findOne);
router.get("/package/:id", deliverabiltyPackage.findOne);
router.get("/spec/:id", deliverabilitySpec.findOne);

// Update a Tutorial with id
router.put("/config/:id", deliverabiltyConfig.update);
router.put("/package/:id", deliverabiltyPackage.update);
router.put("/spec/:id", deliverabilitySpec.update);

// Delete a Tutorial with id
router.delete("/config/:id", deliverabiltyConfig.delete);
router.delete("/package/:id", deliverabiltyPackage.delete);
router.delete("/spec/:id", deliverabilitySpec.delete);

// Create a new Tutorial
router.delete("/config", deliverabiltyConfig.deleteAll);
router.delete("/package", deliverabiltyPackage.deleteAll);
router.delete("/spec", deliverabilitySpec.deleteAll);


module.exports = router;

