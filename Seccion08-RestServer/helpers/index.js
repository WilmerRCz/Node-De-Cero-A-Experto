const dbValidatos = require('./db-validators')
const generateToken = require('./generateToken')
const googleVerify = require('./google-verify')
const uploadFile = require('./upload-file')

module.exports = {
  ...dbValidatos,
  ...generateToken,
  ...googleVerify,
  ...uploadFile
}