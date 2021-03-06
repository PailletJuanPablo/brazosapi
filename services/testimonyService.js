const errors = require("../errors/errors");
const { uploadFile, deleteFile } = require("./awsService");
const testimonyJoiValidation = require("../joivalidation/updateTestimony");
const { validateImage } = require("../util/validateImage");
const db = require("../models");

const findAll = async () => {
  try {
    return await db.Testimony.findAll({
      where: {
        organizationId: "1",
      },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'name', 'createdAt', 'content', 'image']
    });
  } catch (error) {
    console.log(error);
  }
};



const create = async (data, fileprops, organizationId) => {
  let result, statusCode;
  try {
    await testimonyJoiValidation(data);  // mi validacion
    validateImage(fileprops);
    const fileUploaded = await uploadFile(
      organizationId,
      fileprops.originalname,
      fileprops.buffer
    );
    data.organizationId = organizationId;
    data.image = fileUploaded.Location;
    const newTestimony = await db.Testimony.create(data);
    result = parse(newTestimony);
    statusCode = 201;
  } catch (error) {
    result = { message: error.message };
    statusCode = error.statusCode || 500;
  }
  return {
    result,
    statusCode,
  };
};

const parse = (content) => {
  return {
    name: content.name,
    content: content.content,
    image: content.image,
    createdAt: content.createdAt
  };
};

const edit = async (id, data, organizationId, fileprops = null) => {
  let result, statusCode;
  try {
    const testimony = await db.Testimony.findByPk(id);
    if (!testimony) {
      throw new errors.NotExistTestimony("NO EXISTE UN TESTIMONIO CON ESE ID");
    }
    const { image } = testimony;
    const url = image.split('/');
    const keyAws = `${url[url.length - 2]}/${url[url.length - 1]}`
    await testimonyJoiValidation(data);
    if (fileprops === null) {
      console.log('No hay archivo');
      await db.Testimony.update(data, {
        where: {
          id
        }
      });
    } else {
      await deleteFile(keyAws);
      console.log('imagen eliminada de aws');
      validateImage(fileprops);
      const fileUploaded = await uploadFile(
        organizationId,
        fileprops.originalname,
        fileprops.buffer
      );
      data.image = fileUploaded.Location;
      await db.Testimony.update(data, {
        where: {
          id
        }
      });
    }
    const updatedTestimony = await db.Testimony.findByPk(id);
    result = updatedTestimony;
    statusCode = 200;
  } catch (error) {
    result = { msg: error.message };
    statusCode = error.statusCode;
  }
  return {
    result,
    statusCode,
  };
};

const remove = async (id) => {
  try {
    const testimony = await db.Testimony.findByPk(id);
    if (!testimony) {
      deletedEntry = null;
    } else {
      await db.Testimony.destroy({
        where: {
          id,
        },
      });
    }
    return testimony;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  edit,
  findAll,
  remove
};
