const { response, request, json } = require("express")
const bcryptjs = require('bcryptjs')
const User = require("../models/user")
const { generateToken } = require('../helpers/generateToken')
const { googleVerify } = require("../helpers/google-verify")



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

  try {

    const { name, email, image} = await googleVerify( id_token );
    
    let user = await User.findOne({ email })

    if ( !user ){

      const data = {
        name,
        email,
        password: ':p',
        image,
        role: 'USER_ROLE',
        isGoogle: true
      }

      user = new User( data );
      await user.save();

    }

    if ( !user.status) {
      return res.status(401).json({
        message: 'User deleted'
      })
    }

    const token = await generateToken(user.id);

    res.json({
      user,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: 'Token not verify'
    })
  }

}


module.exports = {
  login,
  googleSignIn
}