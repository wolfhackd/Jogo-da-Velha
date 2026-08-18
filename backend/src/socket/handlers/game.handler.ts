import { Server, Socket } from "socket.io";
import { Games } from "./game.state.js";
import { checkWinner, switchPlayer } from "../game/game.logic.js";
import { playMove } from "../game/game.actions.js";



export function gameHandler(io: Server, socket: Socket){


    socket.on("game:play", ({ position, roomId }: { position: number, roomId: string }) => {

        const game = Games.get(roomId);

        let player: "X" | "O" | null = null;
        if(game?.players.X?.socketId === socket.id){
            player = "X";
        }else if(game?.players.O?.socketId === socket.id){
            player = "O";
        };

        if(player !== game?.currentPlayer){
            return;
        };

        if(game?.board[position] !== null){
            return;
        };

        playMove(game, position, player);

        Games.set(roomId, game);
        const winner = checkWinner(game.board);

        io.to(roomId).emit("game:switch", switchPlayer(game));

        io.to(roomId).emit("game:board", {
            board: game.board,
            currentPlayer: game.currentPlayer,
            moves: game.moves
        });

        if (winner) {
            game.score[winner] += 1;
            game.board.fill(null);
            game.moves.X = [];
            game.moves.O = [];
            game.currentPlayer = winner === "X" ? "O" : "X";
            Games.set(roomId, game);
            io.to(roomId).emit("game:win", game);
        }
    });
}