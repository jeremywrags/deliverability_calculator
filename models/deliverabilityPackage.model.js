module.exports = (sequelize, Sequelize) => {
    const DeliverabilityPackage = sequelize.define("deliverabilityPackage", {
    package: {
      type: Sequelize.STRING
    },
    commercialIPs: {
      type: Sequelize.INTEGER
    },
    transactionalIPs: {
      type: Sequelize.INTEGER
    },
    privateDomains: {
      type: Sequelize.INTEGER
    },
    SAPs: {
      type: Sequelize.INTEGER
    }
  }); 
  return DeliverabilityPackage;
};