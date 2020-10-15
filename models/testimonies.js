'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Testimony extends Model {
    static associate(models) {
      posts.belongsTo(models.organization, {
        foreignKey: {
          name: 'organizationId',
          allowNull: false
        }
      })
    }
  };
  Testimony.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    organizationId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Testimony',
  });
  return Testimony;
};