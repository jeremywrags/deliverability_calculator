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
        type: Sequelize.BIGINT
      },
      dailySendVolume: {
        type: Sequelize.BIGINT
      },
      hourlySendVolume: {
        type: Sequelize.BIGINT
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
      },     
      TotalCommercialIPs: {
        type: Sequelize.INTEGER
      },
      TotalTransactionalIPs: {
        type: Sequelize.INTEGER
      },      
      TotalPrivateDomains: {
        type: Sequelize.INTEGER
      },     
      TotalSAPs: {
        type: Sequelize.INTEGER
      },      
      DedicatedDB: {
        type: Sequelize.BOOLEAN
      },      
      TotalDedicatedMTAs: {
        type: Sequelize.INTEGER
      },      
      NeedDedicatedMTA: {
        type: Sequelize.BOOLEAN
      },
      TotalSSL: {
        type: Sequelize.INTEGER
      }   
    });
  
    return DeliverabilityConfig;
  };