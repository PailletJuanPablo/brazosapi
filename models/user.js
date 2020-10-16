'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { as: 'role' });
      User.belongsTo(models.Organization, { as: 'organization' })
    }
  };
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      organizationId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
      recovery_password_token: DataTypes.STRING
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'User'
    }
  );
  return User;
};