const Role = require('../models/role')
const User = require('../models/user')

const isExistsRole = async (role = 'USER_ROLE') => {
  const isExistsRole = await Role.findOne({ role })
  if (!isExistsRole){
    throw new Error('Role not exists in database')
  }
}

const isExistsEmail = async ( email = '') => {
const isExistsUser = await User.findOne({email})
  if (isExistsUser) {
    throw new Error('Email exists')
  }
}

const isExistsUserId = async ( _id) => {
  const isExistsUserId = await User.findById({_id})
    if (!isExistsUserId) {
      throw new Error('Id not exists')
    }
  }


module.exports = {
  isExistsRole,
  isExistsEmail,
  isExistsUserId
}