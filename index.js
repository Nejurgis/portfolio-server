let app = require('express')()
let http = require('http').Server(app)
let io = require('socket.io')(http)


// app.use(cors())

let coords = []

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('load history', ()=> {
      socket.emit('here you go', coords)
      // console.log('on loading history coords.length is:', coords.length)
  })
  socket.on("hell", (msg)=> {
    // console.log('when its hell coords.length is:', coords.length)

    if (coords.length >= 700) {
      coords.shift()
      // console.log('shifted the coords')
    } else {
      coords.push(msg)
      // console.log('msg:', msg)
      // console.log('coords', coords)
    }
    io.emit('livestream', msg)
    // console.log('when its livestream coords.length is:', coords.length)

  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(process.env.PORT || 3000, () =>{
  console.log('Im the server and ill be runnin');
});


