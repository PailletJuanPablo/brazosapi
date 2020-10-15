const db = require('../models');

const add = async (contributor) => {
  try {
    const { fullName, email, type, message } = contributor;

    const newContributor = await db.Contributor.create({
      fullName,
      email,
      type,
      message
    });
    if (!newContributor) {
      throw new Error('Contributor has not been created.');
    } else {
      return await newContributor;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { add };