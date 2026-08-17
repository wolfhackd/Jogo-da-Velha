import { Server, Socket } from "socket.io";
import { Games } from "./game.state.js";
import { createGame } from "../game/game.factory.js";

export function roomHandler(io: Server, socket: Socket) {
    socket.on("room:join", (roomId: string) => {
        const userId = socket.data.userId;

        let game = Games.get(roomId);

        if (!game) {
            game = createGame(roomId, userId, socket.id);

            Games.set(roomId, game);

            socket.join(roomId);

            socket.emit("game:joined", {
                socketId: socket.id,
                symbol: "X",
            });

            return;
        }

        // ==========================================
        // RECONEXÃO DO JOGADOR X
        // ==========================================
        if (game.players.X?.userId === userId) {
            game.players.X!.socketId = socket.id;

            socket.join(roomId);

            socket.emit("game:reconnected", {
                socketId: socket.id,
                symbol: "X",
            });

            Games.set(roomId, game);

            return;
        }

        // ==========================================
        // RECONEXÃO DO JOGADOR O
        // ==========================================
        if (game.players.O?.userId === userId) {
            game.players.O!.socketId = socket.id;

            socket.join(roomId);

            socket.emit("game:reconnected", {
                socketId: socket.id,
                symbol: "O",
            });

            Games.set(roomId, game);

            io.to(roomId).emit("game:start", game);

            return;
        }

        // ==========================================
        // ENTRA COMO JOGADOR O
        // ==========================================
        if (!game.players.O) {
            game.players.O = {
                userId,
                socketId: socket.id,
            };

            socket.join(roomId);

            socket.emit("game:joined", {
                socketId: socket.id,
                symbol: "O",
            });

            Games.set(roomId, game);

            io.to(roomId).emit("game:start", game);

            return;
        }

        // ==========================================
        // SALA CHEIA
        // ==========================================
        socket.emit("game:error", {
            message: "Room full",
        });
    });
}
