//const { resolve } = require("path/posix");
const db = require("../models");
const DeliverabilityConfig = db.deliverabilityConfgs;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create2 = (dConfig) => {
   
  // Save Tutorial in the database
  DeliverabilityConfig.create(dConfig)
    .then(data => {
      return data
    })
    .catch(err => {
      return {
        message:
          err.message || "Some error occurred while createing this config."
      };
    });
};

// Create and Save a new Tutorial
exports.create = (req, res) => {
  
  // Create a Tutorial
  const deliverability = {
    
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
  };

  // Save Tutorial in the database
  DeliverabilityConfig.create(deliverability)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.findAll2 = (createdBy) => {  
  var condition = createdBy ? { createdBy: { [Op.iLike]: `%${createdBy}%` } } : null;

  return DeliverabilityConfig.findAll({ where: condition })
    .then(data => {
      return data;
    })
    .catch(err => {
      return {
        message:
          err.message || "Some error occurred while retrieving tutorials."
      };
    });
};

exports.getConfigs = (createdBy) => {  
  var condition = createdBy ? { createdBy: { [Op.iLike]: `%${createdBy}%` } } : null;

  return DeliverabilityConfig.findAll({
    attributes: ['id','description', 'oportunity']},
    { where: condition }
  ).then(data => {
      return data;
  }).catch(err => {
      return {
        message:
          err.message || "Some error occurred while retrieving tutorials."
      };
  });
};

exports.findAll = (req, res) => {
    const createdBy = req.query.createdBy;
    var condition = createdBy ? { createdBy: { [Op.iLike]: `%${createdBy}%` } } : null;
  
    DeliverabilityConfig.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };


  exports.findConfig = (id) => {        
    return DeliverabilityConfig.findByPk(id)
      .then(data => {
        return data;
      })
      .catch(err => {
        return {
          message:
            err.message || "Some error occurred while retrieving Config."
        };
      });
  };



// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    DeliverabilityConfig.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    DeliverabilityConfig.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };
  

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    DeliverabilityConfig.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  DeliverabilityConfig.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  DeliverabilityConfig.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  