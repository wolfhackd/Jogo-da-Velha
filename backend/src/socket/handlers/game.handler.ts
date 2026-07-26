import { Server, Socket } from "socket.io";
import { playMove } from "./game.service";


export function gameHandler(io: Server, socket: Socket){
    

    socket.on("game:play", ({ position }) => {
        playMove(io, socket, position);
    });

    // socket.on("game:play",()=>{});
    // socket.on("game:restart",()=>{});
    // games.delete(roomId);
}