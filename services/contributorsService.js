const db = require('../models');
const contributionJoiValidation = require("../joivalidation/updateContribution");

const add = async (data) => {
  let result, statusCode;
  try {

    await contributionJoiValidation(data);  // mi validacion

    const contributorAdded = await db.Contributor.create(data);
    const contribution = {
      id: contributorAdded.id,
      fullName: contributorAdded.fullName,
      email: contributorAdded.email,
      type: contributorAdded.type,
      message: contributorAdded.message,
      createdAt: contributorAdded.createdAt
    }
    result = { message: "OK" , contribution};
    statusCode = 201
  } catch (error) {
    result = { message: error.message };
    statusCode = error.statusCode || 500;
  }
  return {
    result,
    statusCode,
  };
};

const findAll = async () => {
  try {
    return await db.Contributor.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'fullName', 'email', 'type', 'message', 'createdAt']
    });
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  add,
  findAll
};
