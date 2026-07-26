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

    // Player X
    if(game?.players.X === socket.id && game.currentPlayer === "X") {
        
        if(game.board[position]) {
            io.to(roomId).emit("game:error", {message: "Position already played"});
            return;
        };

        game.board[position] = "X";

        game.moves.X.push(position);
        
        if(game.moves.X.length > 3) {
            const oldestMove = game.moves.X.shift();
            game.board[oldestMove!] = null;
        }
        
        game.currentPlayer = "O";
        io.to(roomId).emit("game:play", {board: game.board, currentPlayer: game.currentPlayer});
        return
    }
    
    // Player O
    if(game?.players.O === socket.id && game.currentPlayer === "O") {

        if(game.board[position]) {
            io.to(roomId).emit("game:error", {message: "Position already played"});
            return;
        };
        game.board[position] = "O";
        
        game.moves.O.push(position);

        if(game.moves.O.length > 3) {
            const oldestMove = game.moves.O.shift();
            game.board[oldestMove!] = null;
        }

        game.currentPlayer = "X";
        io.to(roomId).emit("game:play", {board: game.board, currentPlayer: game.currentPlayer});
        return
    }


}

// export function restartGame(io: Server, socket: Socket) {}