const AWS = require('aws-sdk')
require('dotenv').config()

const BUCKET_NAME = 'alkemy-ong'
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4'
})

const uploadFile = async (userId, fileName, fileStream) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${userId}/${Date.now()}-${fileName}`,
    Body: fileStream
  }
  try {
    const response = await s3.upload(params).promise()
    return response
  } catch (error) {
    throw { message: error.message }
  }
}

const deleteFile = async (url) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: url
  }

  try {
    const response = await s3.deleteObject(params).promise();
    console.log(response);
    return response;
  } catch (error) {
    throw { message: error.message }
  }
}

module.exports = { uploadFile, deleteFile }