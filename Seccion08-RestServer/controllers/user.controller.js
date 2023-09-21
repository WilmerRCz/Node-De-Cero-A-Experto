const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')


const getUser = async(req = request, res = response) => {
  
  const { limit = 5, from = 0 } = req.query

  const [total, users] = await Promise.all([
    User.countDocuments({ status: true}),
    User.find({ status: true})
    .skip(Number(from))
    .limit(Number(limit))
  ])

  res.json({
    total,
    users
  })
}

const createUser = async (req, res = response) => {
  

  
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role })

  //Verify is user exists
  
  //Encrypt password
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  //Save in database
  await user.save()

  res.status(201).json({
    user
  })
}

const editUser = async (req, res) => {
  const id = req.params.id
  const { _id, password, isGoogle, email, ...updateUser } = req.body
  
  if( password ) {
    //Encrypt password
    const salt = bcryptjs.genSaltSync()
    updateUser.password = bcryptjs.hashSync(password, salt)

  }
  
  const user = await User.findByIdAndUpdate(id, updateUser)

  res.json({
    user
  })
}

const deleteUser = async (req = request, res = response) => {

  const { id } = req.params

  //Delete user
  //const user = await User.findByIdAndDelete(id)

  const user = await User.findByIdAndUpdate(id, {status: false})


  res.json(user)
}


module.exports = {
  getUser,
  createUser,
  editUser,
  deleteUser
}