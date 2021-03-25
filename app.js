const path = require('path');
const http = require('http')
const express = require('express');
const socketio = require('socket.io')


const app = express();
const server = http.createServer(app);
const io = socketio(server)

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//run
io.on('connection', socket => {
    

    //welcome
    socket.emit('message', 'Welcome!');


    //broadcast when user connects
    socket.broadcast.emit('message', 'user joined');


    //runs when user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'a user has left this chat');
    })

});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on ${PORT}`));