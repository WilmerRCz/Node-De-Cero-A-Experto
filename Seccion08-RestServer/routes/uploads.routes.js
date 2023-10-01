const { Router } = require('express')
const { check } = require('express-validator')
const { uploadArchive } = require('../controllers/uploads.controller')

const router = Router()

router.post('/', uploadArchive)




module.exports = router