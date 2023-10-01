const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types
const { User, Category, Product } = require('../models')
const allowedCollections = [
  'users',
  'categories',
  'product',
  'role'
]

const searchUser = async (term = '', res  = response) => {
  try {

    const isMongoId = ObjectId.isValid( term );

    if (isMongoId) {
      const user = await User.findById( term );
      return res.json({
        results: ( user ) ? [ user ] : []
      })
    }

    

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error search user'
    })
  }
}

const search = (req = request, res = response) => {
  const { collection, term } = req.params
  
  if ( !allowedCollections.includes( collection ) ) {
    return res.status(400).json({
      message: `The allowed collections is: ${allowedCollections}`
    })
  }

  switch (collection) {
    case 'users':
      searchUser(term, res)
    break;

    case 'categories':
      
    break;

    case 'products':
      
    break;

    case 'users':
      
    break;
  
    default:
    res.status(500).json({
      message: 'NOT VALID OPTION'
    })
    break;
  }

}

module.exports = {
  search
}