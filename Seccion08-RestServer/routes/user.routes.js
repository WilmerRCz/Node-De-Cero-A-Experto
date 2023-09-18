const { Router } = require('express')
const { getUser, createUser, editUser, deleteUser } = require('../controllers/user.controller')

const router = Router()

router.get('/', getUser)

router.post('/', createUser)

router.put('/:id', editUser)

router.delete('/', deleteUser)







module.exports = router