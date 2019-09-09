'use strict';
module.exports = (sequelize, DataTypes) => {
  const FinancialCalculator = sequelize.define('FinancialCalculator', {
    message: DataTypes.STRING
  }, {});

  FinancialCalculator.associate = function (models) {
    // associations can be defined here
  };

  return FinancialCalculator;
};
