const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateToken = async(req = request, res = response, next) => {
  
  const token = req.headers('x-token')

  if(!token){
    return res.status(401).json({
      message: 'Not contain Token'
    })
  }

  try {

    const { uid } = jwt.verify(token, process.env.SECRET_KEY)
    
    user = await User.findById( uid )

    if(!user){
      return res.status(401).json({
        message: 'Not valid token'
      })
    }

    if(!user.status){
      return res.status(401).json({
        message: 'Not valid token'
      })
    }
    req.user = user

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      message: 'Not valid token'
    })
  }


} 



module.exports = {
  validateToken
}
