const mongoose = require('mongoose')

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN)
    console.log('Conexión a database exitosa!!!')
  } catch (error) {
    console.log(error)
    throw new Error('Error en iniciar conexión a database')
  }
  
}


module.exports = {
  dbConnection
}