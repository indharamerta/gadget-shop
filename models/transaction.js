'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    UserId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    paid_status: DataTypes.BOOLEAN,
    TransactionId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  Transaction.beforeCreate((instance, opt) => {
    if(!instance.totalPrice) {
      if (instance.ItemId === 13) {
        instance.totalPrice = instance.quantity * 18000000
      } else if (instance.ItemId === 14) {
        instance.totalPrice = instance.quantity * 15000000
      } else if (instance.ItemId === 15) {
        instance.totalPrice = instance.quantity * 12000000
      } else if (instance.ItemId === 16) {
        instance.totalPrice = instance.quantity * 20000000
      }
    }
  })
  return Transaction;
};