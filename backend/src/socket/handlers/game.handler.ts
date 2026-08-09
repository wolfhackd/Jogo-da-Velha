import { Server, Socket } from "socket.io";
import { Games } from "./game.state";

const winnerConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],                                        
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkWinner = (board: (null | "X" | "O")[]): "X" | "O" | null => {
    for (const condition of winnerConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};


export function gameHandler(io: Server, socket: Socket){


    socket.on("game:play", ({ position, roomId }) => {

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

        game.board[position] = player;

        if(player === "X"){
            game.moves.X.push(position);
        }else{
            game.moves.O.push(position);
        }

        if(game.moves.X.length > 3){
            
            const firstMove = game.moves.X.shift();
            game.board[firstMove!] = null;
        }
        if(game.moves.O.length > 3){
            const firstMove = game.moves.O.shift();
            game.board[firstMove!] = null;
        }

        Games.set(roomId, game);
        const winner = checkWinner(game.board);

        
        if(game.currentPlayer === "X"){
            game.currentPlayer = "O";
        }else{
            game.currentPlayer = "X";
        }

        io.to(roomId).emit("game:switch", { currentPlayer: game.currentPlayer });

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