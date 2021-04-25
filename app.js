const express=require('express');
const app=express();
const socketio=require('socket.io');
const http=require('http');
const server=http.Server(app);
const io=socketio(server);
const path = require('path');


app.use('/', express.static(path.join(__dirname, 'stats')));

const mapping = {};


io.on('connection', (socket) => {
    console.log(socket.id + ' ===> Connected');

    socket.on('login', (data) => {
        mapping[socket.id] = data.name;
    })


    socket.on('send-msg', (data) => {
        // console.log(`${socket.id} says ${data.msg}`);
        io.emit('received-msg', {
            name:mapping[socket.id],
            msg:data.msg
        })
    })

})






server.listen(4444,() => {
    console.log("Server running at port 4444");
})