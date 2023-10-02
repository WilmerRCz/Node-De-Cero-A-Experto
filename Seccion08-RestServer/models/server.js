const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { dbConnection } = require('../database/config')
require('dotenv').config()


class Server {


  constructor(){
    this.app = express()
    this.PORT = process.env.PORT

    this.connectDB()

    //Middlewares
    this.middlewares()
    //Routes
    this.routes()
  }

  async connectDB() {
    await dbConnection()
  }

  middlewares() {
    //Cors
    this.app.use(cors())
    // Lectura y parseo del body
    this.app.use( express.json() )
    // Directorio Publico
    this.app.use(express.static('public'))
    // Carga de archivos
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }

  routes(){
    this.app.use('/api/auth', require('../routes/auth.routes'))
    this.app.use('/api/users', require('../routes/users.routes'))
    this.app.use('/api/categories', require('../routes/categories.routes'))
    this.app.use('/api/products', require('../routes/products.routes'))
    this.app.use('/api/search', require('../routes/search.routes'))
    this.app.use('/api/uploads', require('../routes/uploads.routes'))

  }

  listen(){
    

    this.app.listen(this.PORT, () => {
      console.log('App listening in port: ', this.PORT)
    })
  }
}


module.exports = Server