const { Router } = require('express')
const { check } = require('express-validator')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/products.controller')
const { validateInputs, validateToken, isAdminRole } = require('../middlewares')
const { isExistsProduct, isExistsCategory } = require('../helpers/db-validators')

const router = Router()

router.get('/', [

], getProducts)

router.get('/:id', [
  check('id', 'Not is valid id').isMongoId(),
  check('id').custom(isExistsProduct),
  validateInputs
], getProductById)

router.post('/',[
  validateToken,
  check('name', 'Name is required').not().isEmpty(),
  check('name', 'Name must be string').isString(),
  check('category', 'Not is valid id for category').isMongoId(),
  check('category').custom(isExistsCategory),
  validateInputs
], createProduct)

router.put('/:id',[
  validateToken,
  check('name', 'Name must be string').isString(),
  check('id').custom(isExistsProduct),
  // check('category', 'Not is valid id for category').isMongoId(),
  // check('category').custom(isExistsCategory),
  validateInputs
], updateProduct)

router.delete('/:id',[
  validateToken,
  isAdminRole,
  check('id', 'Not is valid id').isMongoId(),
  check('id').custom(isExistsProduct),
  validateInputs
], deleteProduct)

module.exports = router