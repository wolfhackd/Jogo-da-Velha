import { Server, Socket } from "socket.io";
import { gameHandler } from "./handlers/game.handler";
import { roomHandler } from "./handlers/room.handler";

export function registerConnection(io: Server, socket: Socket) {

    roomHandler(io, socket);
    gameHandler(io, socket);

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
}