module.exports = (sequelize, Sequelize) => {
    const DeliverabilityConfig = sequelize.define("deliverabilityConfig", {
    createdBy: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      account: {
        type: Sequelize.STRING
      },
      accountURL: {
        type: Sequelize.STRING
      },
      oportunity: {
        type: Sequelize.STRING
      },
      oportunityURL: {
        type: Sequelize.STRING
      },
      yearlySendVolume: {
        type: Sequelize.INTEGER
      },
      dailySendVolume: {
        type: Sequelize.INTEGER
      },
      hourlySendVolume: {
        type: Sequelize.INTEGER
      },
      txnDedicatedIP: {
        type: Sequelize.BOOLEAN
      },
      txnDailyVolume: {
        type: Sequelize.INTEGER
      },
      buFullBranding: {
        type: Sequelize.INTEGER
      },
      buPartialBranding: {
        type: Sequelize.INTEGER
      },
      dedicatedDB: {
        type: Sequelize.BOOLEAN
      },
      SSL: {
        type: Sequelize.BOOLEAN
      }      
    });
  
    return DeliverabilityConfig;
  };