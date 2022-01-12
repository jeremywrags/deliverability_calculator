var express = require('express');
var router = express.Router();
const path = require('path');
const auth = require('http-auth');
const url = require('url');
const request = require('request');
const fs = require('fs');

const deliverabiltyConfigs = require("../controllers/deliverabilityConfig.controller.js");
const deliverabilityPackages = require("../controllers/deliverabilityPackage.controller.js");
const deliverabilitySpecs = require("../controllers/deliverabilitySpec.controller.js");



/* Salesforce Auth setup */
const SalesforceClient = require('salesforce-node-client');
const deliverabilitySpecModel = require('../models/deliverabilitySpec.model.js');
var sfdcConfig;
var salesforceAuthUri;

if (process.env.consumerKey) {
  if (process.env.consumerKey.length > 0) {
      sfdcConfig = {
          domain: process.env.sfDomain,
          callbackUrl: process.env.appCallbackUrl,
          consumerKey: process.env.consumerKey,
          consumerSecret: process.env.consumerSecret,
          apiVersion: 'v41.0'
      };
  
  const sfdc = new SalesforceClient(sfdcConfig);
  var salesforceAuthUri = sfdc.auth.getAuthorizationUrl({scope: 'id api'});
  
  }
}
var IsExpert = 'false';

// Check if aloha auth is current
var authCheck = function(req, res, next) {
            
  console.log('Aloha: checking authorization');
  // If Aloha auth is not required, bypass it 
  if (process.env.EDT_ALOHA == 2) {
      console.log('Aloha: auth not required in this context');                        
      IsExpert = false;
      return next();
  }
  if (process.env.EDT_ALOHA == 0) {
      console.log('Aloha: auth not required in this context');
      IsExpert = true;        
      return next();
  }
  else {                          
      if (req.signedCookies.tsToken) {
          console.log('Aloha: authorization found');                  
      
          // Check for IsExpert flag
          if (req.signedCookies.tsExpert == "true") {           
              console.log('Aloha: verified expert status');           
              IsExpert = true;    
          }
          else {  
              console.log('Aloha: not an expert');
              IsExpert = false;
          }           
          return next();                      
      }
      else {          
          console.log('Aloha: could not find a current auth cookie; redirection to authentication page');
          res.redirect(salesforceAuthUri);
      }
  }
};

/* GET home page. */
router.get('/', authCheck, function(req, res, next) {     
  res.render('index', { title: 'Deliverability Calculator', UserEmail : req.signedCookies.tsUser, UserName : req.signedCookies.tsUserName});    
});

router.get('/getConfigs', authCheck, function(req, res, next) {     
  var delConfig = deliverabiltyConfigs.getConfigs(req.signedCookies.tsUser);
  
  Promise.all([delConfig]).then((results) =>{
    res.json(results[0]);    
  })
      
});

router.post('/getConfig', authCheck, function(req, res, next) {     
  
  deliverabiltyConfigs.findConfig(req.body.configID).then( data =>{
    res.json(data);    
  }) 
});

router.get('/getPacks', authCheck, function(req, res, next) {     
  deliverabilityPackages.findAll2().then(data => {
    res.json(data);
  })  
});

router.post("/create", function(req, res, next){
  
  //res.json(test(req));
  var result1 = deliverabilitySpecs.findAll2();
  var result2 = result1.then(data => { 
    let cfgObject = {
      "createdBy" :  req.body.createdBy,
      "description" :  req.body.description,
      "account" :  req.body.account,
      "accountURL" :  req.body.accountURL,
      "oportunity" :  req.body.oportunity,
      "oportunityURL" :  req.body.oportunityURL,
      "yearlySendVolume" :  req.body.yearlySendVolume,
      "dailySendVolume" :  req.body.dailySendVolume,
      "hourlySendVolume" :  req.body.hourlySendVolume,
      "txnDedicatedIP" :  req.body.txnDedicatedIP,
      "txnDailySendVolume" :  req.body.txnDailySendVolume,
      "buFullBranding" :  req.body.buFullBranding,
      "buPartialBranding" :  req.body.buPartialBranding,
      "dedicatedDB" :  req.body.dedicatedDB,
      "SSL" :  req.body.SSL,
      "TotalCommercialIPs": Math.round((req.body.dailySendVolume/data[0].dailyMaxPerIP)),      
      "TotalTransactionalIPs": Math.round((req.body.txnDailySendVolume/data[0].dailyMaxPerIP)),
      "TotalPrivateDomains": req.body.buPartialBranding,
      "TotalSAPs" : req.body.buFullBranding, 
      "TotalDedicatedDBs" : req.body.yearlySendVolume > data[0].ddbEmailsPerYear ? 'true' : req.body.dailySendVolume  > data[0].ddbEmailsPerDay ? 'true' : 'false',
      "TotalSSL" : req.body.buFullBranding * 2
    };            
    return deliverabiltyConfigs.create2(cfgObject)
  });
  return Promise.all([result1, result2]).then(function([res1, res2]) {
    res.json({result1: res1, result2: res2})    
  });
});

router.get("/createTest", function(req, res, next){
  
  //res.json(test(req));
  var result1 = deliverabilitySpecs.findAll2();
  var result2 = result1.then(data => {
    console.log(data[0].dailyMaxPerIP);
    let cfgObject = {
      "createdBy" :  "jragsdale@salesforce.com",
      "description" :  "My first test config",
      "account" :  "Tire Discounter",
      "accountURL" :  "http://salesforce.com",
      "oportunity" :  "Grammarly Upsell",
      "oportunityURL" :  "http://salesforce.com",
      "yearlySendVolume" :  25000000000,
      "dailySendVolume" :  25000000,
      "hourlySendVolume" :  1325000,
      "txnDedicatedIP" :  "true",
      "txnDailyVolume" :  250000000,
      "buFullBranding" :  5,
      "buPartialBranding" :  2,
      "dedicatedDB" :  "true",
      "SSL" :  "true",    
      "TotalCommercialIPs": Math.round((data[0].dailyMaxPerIP/250000)),      
      "TotalTransactionalIPs": Math.round((data[0].dailyMaxPerIP/8000000)),
      "TotalPrivateDomains": 2,
      "TotalSAPs" : 5, 
      "DedicatedDB" : 25000000000 > data[0].ddbEmailsPerYear ? 'true' : 25000000  > data[0].ddbEmailsPerDay ? 'true' : 'false',
      "TotalSSL" : 5 * 2
    };     
    console.log(cfgObject);
    return deliverabiltyConfigs.create2(cfgObject)
  });
  return Promise.all([result1, result2]).then(function([res1, res2]) {
    res.json({result1: res1, result2: res2})    
  });
});


router.post('/calculate', authCheck, function(req, res, next){
  var post_body = req.body;
  res.send("success");
})


router.get('/myConfigs', function(req, res, next) {
  
  res.render('myConfigs', { title: 'Express' });
});


module.exports = router;


