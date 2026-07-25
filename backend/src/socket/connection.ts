import { Server, Socket } from "socket.io";
import { gameHandler } from "./handlers/game.handler";
import { roomHandler } from "./handlers/room.handler";





export function registerConnection(io: Server, socket: Socket) {

    //Handler de entrar em partida
    roomHandler(io, socket);
    gameHandler(io, socket);
    // gameEventsHandler(io, socket);


    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
}