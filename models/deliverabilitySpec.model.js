module.exports = (sequelize, Sequelize) => {
    const DeliverabilitySpec = sequelize.define("deliverabilitySpec", {
    dailyMaxPerIP: {
      type: Sequelize.INTEGER
    },
    ddbEmailsPerDay: {
      type: Sequelize.INTEGER
    },
    ddbEmailsPerYear: {
      type: Sequelize.INTEGER
    }
  }); 
  return DeliverabilitySpec;
};