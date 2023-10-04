const express = require('express')
const cors = require('cors')
const { socketController } = require('../sockets/controller')


class Server {


  constructor(){
    this.app = express()
    this.PORT = process.env.PORT
    this.server = require('http').createServer(this.app)
    this.io = require('socket.io')(this.server)
    
    //Middlewares
    this.middlewares()
    //Routes
    this.routes()

    //Sockets
    this.sockets()
  }

  middlewares() {
    //Cors
    this.app.use(cors())
    // Directorio Publico
    this.app.use(express.static('public'))
  }

  routes(){

  }

  sockets() {
    this.io.on('connection', socketController)
  }

  listen(){
    this.server.listen(this.PORT, () => {
      console.log('App listening in port: ', this.PORT)
    })
  }
}


module.exports = Server