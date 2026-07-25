import { Server, Socket } from "socket.io";





export function registerConnection(io: Server, socket: Socket) {

    //minha base principal




    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
}