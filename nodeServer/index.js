const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users={};

io.on('connection' , socket =>{
    socket.on('new-user-joined',name=>{
        
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name)
    });
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    }); 
    socket.on('disconnect',name=>{
        socket.broadcast.emit('leave',users[socket.id])
    }); 
})