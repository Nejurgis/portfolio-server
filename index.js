let app = require('express')()
let http = require('http').Server(app)
let io = require('socket.io')(http)

const fs = require('fs')

// app.use(cors())


// app.get('/', function(req, res){
//   // res.sendFile(__dirname + '/index.html');
//   console.log(res)
// });



io.on('connection', socket => {
  console.log('a user connected');
  const cursorPositions = []
  // socket.json.send
  socket.on('load history', ()=> {
    // console.log('here you go')
    fs.readFile('./hoverData.json', (err,body) => {
      let history = JSON.parse(body)
      console.log('history:', history)
      io.emit('here you go', history)
    })
    
  })
  socket.on("hell", (msg)=> {
    console.log('msg before stringify:', msg)
    let history = JSON.stringify(msg)
    console.log('msg after stringify:', history)
    if (Array.isArray(msg)) {
      // console.log('array is ok')
    } else {
      console.log('ALARM')
    }

    fs.readFile('./hoverData.json',  (err,body) => {
      // console.log('typeof Data!', typeof body)
      // console.log('data before parsing:', body)
      // if (err) throw err
      let validateJson = (body) => {
        try{
          let data = JSON.parse(body)
          return data
        } catch(e) {

          console.log('oops')
          // let data = body.substring(1, body.length-1)
          // console.log('data weird', data)
          let data = new Array;
          // this.heatmap._data.push(coords.slice(-1)[0])
          console.log('error:', e)
          return data
        }

      } 
      if (err) throw err
      let data = validateJson(body)
      if (data){
        // console.log('data after parsing:', data)
        // console.log(file.length)
        if (data.length >= 150) {
          data.shift()
        } else {
          if (Array.isArray(msg)) {

            data.push(msg)
          } else {
            // file.push([])
            console.log('not an array!')
          }
        }
        // need to stringify it back for json to get it
        const json = JSON.stringify(data)
        
        io.emit('livestream', msg)
        console.log('msg:', msg)
        fs.writeFile('./hoverData.json', json,'utf8' , (err) => {
          if (err) {
            console.log('WRITIN AINT WORKIN')
            throw err}
            // console.log(`${msg} written to file`)
          
            
          
        })
    }
    })
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

