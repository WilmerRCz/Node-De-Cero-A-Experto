const { response, request } = require("express")
const bcryptjs = require('bcryptjs')
const User = require("../models/user")



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


    res.json({
      token: 'sss'
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Error in login'
    })
  }
}


module.exports = {
  login
}