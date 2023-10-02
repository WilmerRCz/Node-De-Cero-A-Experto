const validateInputs = require('../middlewares/validate-inputs')
const validateToken = require('../middlewares/validate-token')
const isRole = require('../middlewares/validate-role')
const validateFile = require('../middlewares/validate-file')


module.exports = {
  ...validateInputs,
  ...validateToken,
  ...isRole,
  ...validateFile
}