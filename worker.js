
let count = 0

module.exports.run = function(worker) {
  const scServer = worker.scServer

  scServer.on('connection', socket => {

    socket.on('ping', function (data, res) {
      count++

      res(null, 'Success')
      console.log('PING', data)
    })


  })
}

