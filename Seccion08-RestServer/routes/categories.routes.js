const { Router } = require('express')
const { check } = require('express-validator')
const { validateInputs, validateToken, isAdminRole } = require('../middlewares')
const { createCategory, getCategoryById, updateCategory, deleteCategory, getCategories } = require('../controllers/categories.controller')
const { isExistsCategory } = require('../helpers/db-validators')



const router = Router()

// Obtener todas las categorias - public
router.get('/', getCategories)

// Obtener todas las categorias por id - public
router.get('/:id', [
  check('id', 'Not is valid id').isMongoId(),
  check('id').custom(isExistsCategory),
  validateInputs,
], getCategoryById)

// crear categoria - private
router.post('/', [
  validateToken,
  check('name', 'Name is required').not().isEmpty(),
  check('name', 'Name must be string').isString(),
  validateInputs
], createCategory)

// actualizar categoria - private
router.put('/:id', [
  validateToken,
  check('name', 'Name is required').not().isEmpty(),
  check('name', 'Name must be string').isString(),
  check('id').custom(isExistsCategory),
  validateInputs
], updateCategory)

// Borrar categoria - private
router.delete('/:id', [
  validateToken,
  isAdminRole,
  check('id', 'Not is valid id').isMongoId(),
  check('id').custom(isExistsCategory),
  validateInputs
], deleteCategory)

module.exports = router