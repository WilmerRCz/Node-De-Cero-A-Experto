const { response, request } = require("express")
const bcryptjs = require('bcryptjs')
const User = require("../models/user")
const { generateToken } = require('../helpers/generateToken')



const login = async(req = request, res = response) => {
  const { email, password } = req.body

  try {

    const user = await User.findOne({ email })
    if(!user){
      return res.status(400).json({
        message: 'Email/Password is not correct'
      })
    }

    if(!user.status) {
      return res.status(400).json({
        message: 'Email/Password is not correct'
      })
    }

    const validPassword = bcryptjs.compareSync(password, user.password)

    if(!validPassword){
      return res.status(400).json({
        message: 'Email/Password is not correct'
      })  
    }

    const token = await generateToken(user.id)

    res.json({
      user,
      token
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Error in login'
    })
  }
}

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  res.json({
    message: 'OK!',
    id_token
  })
}


module.exports = {
  login,
  googleSignIn
}