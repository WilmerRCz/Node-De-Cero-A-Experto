const { response } = require('express')

const getUser = (req, res = response) => {
  res.json({
    "msg": "Get API"
  })
}

const createUser = (req, res) => {
  const body = req.body;
  res.status(201).json({
    "msg": "Post API",
    body
  })
}

const editUser = (req, res) => {
  const id = req.params.id
  res.json({
    "msg": "Put API",
    id
  })
}

const deleteUser = (req, res) => {
  res.json({
    "msg": "Delete API"
  })
}


module.exports = {
  getUser,
  createUser,
  editUser,
  deleteUser
}