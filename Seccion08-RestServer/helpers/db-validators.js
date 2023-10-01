const { Category } = require('../models')
const Product = require('../models/product')
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

const isExistsUserId = async ( id) => {
  const isExistsUserId = await User.findById(id)
    if (!isExistsUserId) {
      throw new Error('Id not exists')
    }
  }

const isExistsCategory = async (id) => {
  const isExistsCategory = await Category.findById(id)
  if (!isExistsCategory) {
    throw new Error('Category not exists')
  }
}

const isExistsProduct = async (id) => {
  const isExistsProduct = await Product.findById(id)
  if (!isExistsProduct) {
    throw new Error('Product not exists')
  }
}


module.exports = {
  isExistsRole,
  isExistsEmail,
  isExistsUserId,
  isExistsCategory,
  isExistsProduct
}