const { Router } = require('express')
const { check } = require('express-validator')
const { uploadArchive, getImage, updateImageCloudinary } = require('../controllers/uploads.controller')
const { validateInputs, validateFile } = require('../middlewares')
const { allowedCollections } = require('../helpers')

const router = Router()

router.get('/:collection/:id', [
  check('id', 'Not valid ID').isMongoId(),
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateInputs
],
getImage
)

router.post('/', validateFile, uploadArchive)

router.put('/:collection/:id',[
  validateFile,
  check('id', 'Not valid ID').isMongoId(),
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateInputs
], updateImageCloudinary)




module.exports = router