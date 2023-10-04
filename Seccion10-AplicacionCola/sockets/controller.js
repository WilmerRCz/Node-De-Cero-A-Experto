


const socketController = (socket) => {

  socket.on('enviar-mensaje', (payload, callback) => {
    
    const id = 1234
    callback( id )
    socket.broadcast.emit('enviar-mensaje', payload)
  })


  
}



module.exports = {
  socketController
}