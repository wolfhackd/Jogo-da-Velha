import { Server, Socket } from "socket.io";
import { games } from "./state.game";



export function joinGame(socket: Socket) {
    const roomId = socket.data.roomId;

    let game = games.get(roomId);

    if(!game) {
        game = {
            board: Array(9).fill(null),
            currentPlayer: "X",
            winner: null,
            players: {X: socket.id, O: null},
            roomId
        }

        socket.emit("game:joined", {
        symbol: "X",
        });

        return
    };

    games.set(roomId, game);

    if(!game.players.O) {
        game.players.O = socket.id;

        socket.emit("game:joined", {
            symbol: "O",
        });

        return;
    }

        socket.emit("game:error", {
        message: "Room full",
    });

}

export function leaveGame(io: Server, socket: Socket) {
    socket.leave(socket.data.roomId);
    io.to(socket.data.roomId).emit("game:left");
}

export function playMove(io: Server, socket: Socket, position: number) {}

// export function restartGame(io: Server, socket: Socket) {}