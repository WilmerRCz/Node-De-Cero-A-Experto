const express = require('express')
const cors = require('cors')
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
    this.app.use(cors())
    this.app.use( express.json() )
    this.app.use(express.static('public'))
  }

  routes(){
    this.app.use('/api/auth', require('../routes/auth.routes'))
    this.app.use('/api/user', require('../routes/user.routes'))
  }

  listen(){
    

    this.app.listen(this.PORT, () => {
      console.log('App listening in port: ', this.PORT)
    })
  }
}


module.exports = Server