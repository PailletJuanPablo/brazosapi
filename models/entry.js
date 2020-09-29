'use strict';
module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define('Entry', {
    title: DataTypes.STRING,
    content: DataTypes.STRING(15000),
    image: DataTypes.STRING,
    contentType: DataTypes.STRING,
    category: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Entry',
    paranoid: true
  });
  Entry.associate = function(models) {
    // associations can be defined here
  };
  return Entry;
};