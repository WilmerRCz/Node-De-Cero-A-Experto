const validateInputs = require('../middlewares/validate-inputs')
const validateToken = require('../middlewares/validate-token')
const isRole = require('../middlewares/validate-role')


module.exports = {
  ...validateInputs,
  ...validateToken,
  ...isRole
}