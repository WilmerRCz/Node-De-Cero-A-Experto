const { Router } = require('express')
const { check } = require('express-validator')
const { getUser, createUser, deleteUser, updateUser } = require('../controllers/user.controller')
const { isExistsRole, isExistsEmail, isExistsUserId } = require('../helpers/db-validators')
const { validateInputs, validateToken, isRole} = require('../middlewares')

const router = Router()

router.get('/', getUser)

router.post('/',[
  check('name','Name is required').not().isEmpty(),
  check('password','Password is required').not().isEmpty().isLength({min: 6}),
  check('email', 'email is not valid').isEmail().custom(isExistsEmail),
  //check('role','Role not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( isExistsRole ),
  validateInputs
], createUser)

router.put('/:id', [
  check('id', 'Not valid ID').isMongoId(),
  check('id').custom(isExistsUserId),
  check('role').custom( isExistsRole ),
  validateInputs
] , updateUser)

router.delete('/:id',[
  validateToken,
  //isAdminRole,
  isRole('ADMIN_ROLE', 'SELL_ROLE'),
  check('id', 'Not valid ID').isMongoId(),
  check('id').custom(isExistsUserId),
  validateInputs
] ,deleteUser)







module.exports = router