const { request, response } = require("express");


const uploadArchive = (req = request, res = response) => {
  res.json({
    msg: 'Cargado'
  })
}

module.exports = {
  uploadArchive
}