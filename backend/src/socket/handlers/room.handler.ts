import { Server, Socket } from "socket.io";
import { joinGame, leaveGame } from "./game.service";



export function roomHandler(io: Server, socket: Socket) {

    socket.on("room:join", ({roomId}) => {
        socket.join(roomId);
        socket.data.roomId = roomId;
        joinGame(socket);
    })

    socket.on("room:leave", () => {
        leaveGame(io, socket);
    })
    
}