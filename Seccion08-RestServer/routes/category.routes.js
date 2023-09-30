const { Router } = require('express')
const { check } = require('express-validator')
const { validateInputs, validateToken, isAdminRole } = require('../middlewares')
const { createCategory, getCategoryById, updateCategory, deleteCategory, getCategories } = require('../controllers/category.controller')
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
  validateInputs
], createCategory)

// actualizar categoria - private
router.put('/:id', updateCategory)

// Borrar categoria - private
router.delete('/:id', [
  validateToken,
  isAdminRole,
], deleteCategory)

module.exports = router