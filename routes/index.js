var express = require('express');
var router = express.Router();
const path = require('path');
const auth = require('http-auth');
const url = require('url');
const request = require('request');
const fs = require('fs');


/* Salesforce Auth setup */
const SalesforceClient = require('salesforce-node-client');
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

// Check if aloha auth is current
var authCheckExpert = function(req, res, next) {
            
  console.log('Aloha: checking authorization');
  // If Aloha auth is not required, bypass it 
  //if (process.env.EDT_ALOHA != 1) {       
  if (process.env.EDT_ALOHA == 1) {       
      console.log('Aloha: auth Expert not required in this context');
      return next();
  }
  else {                              
      if (req.signedCookies.tsExpert == "true") {                   
          console.log('Verified expert status');
          
          return next();                      
      }
      else {          
          console.log('Aloha: could verify expert status; redirecting back to home');
          IsExpert = false;
          res.redirect('/');
      }           
  }
};
var basic = auth.basic({
  realm: "Administration"
  }, function (username, password, callback) { // Custom authentication method.
      callback(username === "experts" && password === "manageM0dul3s");
  }
);


/* GET home page. */
router.get('/', authCheck, function(req, res, next) {  
  res.render('index', { title: 'Express' });
});

router.get('/myConfigs', function(req, res, next) {
  res.render('myConfigs', { title: 'Express' });
});

module.exports = router;
