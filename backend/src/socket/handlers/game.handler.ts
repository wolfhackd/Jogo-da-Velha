import { Server, Socket } from "socket.io";
import { Games } from "./game.state.js";
import { addWinnerPoint, checkWinner, switchPlayer } from "../game/game.logic.js";
import { playMove } from "../game/game.actions.js";



export function gameHandler(io: Server, socket: Socket){


    socket.on("game:play", ({ position, roomId }: { position: number, roomId: string }) => {

        const game = Games.get(roomId);

        //Verificações de existencia e comprovação de jogador
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

        //Realiza movimentações dos Jogadores
        playMove(game, position, player);

        const winner = checkWinner(game.board);

        io.to(roomId).emit("game:switch", switchPlayer(game));

        io.to(roomId).emit("game:board", {
            board: game.board,
            currentPlayer: game.currentPlayer,
            moves: game.moves
        });

        //posso enviar o winner board aqui
        //Tenho que devolver o tabuleiro vencedor 
        if (winner) {
            addWinnerPoint(winner,game);
            io.to(roomId).emit("game:win", game);
        }
    });
}