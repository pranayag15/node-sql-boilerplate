var express = require('express')
var router = express.Router()

const {users} = require('../modules/users/users.route.js')
const {verify} = require('../modules/auth/auth.js')

router.use('/', users)
router.use('/', verify)

module.exports = router