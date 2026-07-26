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
            //adicionar pontuação individual depois
            players: {X: socket.id, O: null},
            moves: {X: [], O: []},
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

export function playMove(io: Server, socket: Socket, position: number) {
    const roomId = socket.data.roomId;

    let game = games.get(roomId);

    if (!game) return;

    const playerSign = game.currentPlayer;
    const opponentSign = playerSign === "X" ? "O" : "X";

    if (game.players[playerSign] !== socket.id) return;

    if (game.board[position]) {
        io.to(roomId).emit("game:error", {message: "Position already played"});
        return;
    };
    game.board[position] = playerSign;
    game.moves[playerSign].push(position);

    if (game.moves[playerSign].length > 3) {
        const oldestMove = game.moves[playerSign].shift();
        game.board[oldestMove!] = null;
    }

    game.currentPlayer = opponentSign;
    io.to(roomId).emit("game:play", {board: game.board, currentPlayer: game.currentPlayer});

}

// export function restartGame(io: Server, socket: Socket) {}