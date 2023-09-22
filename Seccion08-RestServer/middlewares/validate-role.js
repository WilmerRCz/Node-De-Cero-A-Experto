const { request, response } = require("express")


const isAdminRole = (req = request, res = response, next) => {

  if(  !req.user ){
    return res.status(500).json({
      message: 'Verify role before token'
    })
  }

  const {role, name} = req.user

  if(role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      message: `${name} is not ADMIN`
    })
  }

  next()
}

const isRole = (...roles) => {
  return (req = request, res = response, next) => {
    
    if(  !req.user ){
      return res.status(500).json({
        message: 'Verify role before token'
      })
    }

    if( !roles.includes(req.user.role )){
      return res.status(401).json({
        message: `${req.user.name} not authorized`
      })
    }
    
    next()
  }
}

module.exports = {
  isAdminRole,
  isRole
}