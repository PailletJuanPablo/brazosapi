const validateImage = (imageProps) => {
  validateImageType(imageProps.mimetype)
  maxImageSize(imageProps.size)
}

const validateImageType = (mimetype) => {
  const possibleImageTypes = [
    'image/jpeg',
    'image/png',
    'image/gif'
  ]
  const found = possibleImageTypes.find(type => type == mimetype)
  if (!found) {
    throw new BadRequest('Image Type Invalid')
  }
}

const maxImageSize = (size) => {
  if (size >= 2097152) {
    throw new BadRequest('The image size is too big.')
  }
}

module.exports = {validateImage}