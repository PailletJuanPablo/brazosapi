'use strict';
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    title: DataTypes.STRING,
    content: DataTypes.STRING(15000),
    image: DataTypes.STRING,
    contentType: DataTypes.STRING,
    category: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'News',
    paranoid: true
  });
  News.associate = function(models) {
    // associations can be defined here
  };
  return News;
};