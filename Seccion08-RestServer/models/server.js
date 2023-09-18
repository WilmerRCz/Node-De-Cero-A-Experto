const express = require('express')
const cors = require('cors')
require('dotenv').config()


class Server {


  constructor(){
    this.app = express()
    this.PORT = process.env.PORT

    //Middlewares
    this.middlewares()
    //Routes
    this.routes()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use( express.json() )
    this.app.use(express.static('public'))
  }

  routes(){
    this.app.use('/api/user', require('../routes/user.routes'))
  }

  listen(){
    

    this.app.listen(this.PORT, () => {
      console.log('App listening in port: ', this.PORT)
    })
  }
}


module.exports = Server