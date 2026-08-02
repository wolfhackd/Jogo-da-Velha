import { Socket } from "socket.io";
import { randomUUID } from "node:crypto";

export function socketMiddleware(socket: Socket, next: (err?: Error) => void) {

    const userId = socket.handshake.auth?.userId || socket.id;

    console.log("Estou aqui " + userId);

    socket.data.userId = userId;
    console.log("UserId da conexão:", socket.data.userId);

    next();
};