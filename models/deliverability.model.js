module.exports = (sequelize, Sequelize) => {
    const Deliverability = sequelize.define("deliverability", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Deliverability;
  };