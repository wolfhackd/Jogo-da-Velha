import { Server, Socket } from "socket.io";



export function roomHandler(io: Server, socket: Socket) {

    socket.on("room:join", (data) => {
        socket.join(data.room);
        io.to(data.room).emit("room:joined", `User ${socket.id} joined room ${data.room}`);
    })

    socket.on("room:leave", (data) => {
        socket.leave(data.room);
        io.to(data.room).emit("room:left", `User ${socket.id} left room ${data.room}`);
    })
    
}