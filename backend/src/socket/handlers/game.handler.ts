import { Server, Socket } from "socket.io";
import { Games } from "./game.state";


export function gameHandler(io: Server, socket: Socket){
    // falta criar a regra do jogo das 4 jogadas


    socket.on("game:play", ({ position, roomId }) => {
        console.log("game:play", position, roomId);
        //pego o jogo pelo roomId
        const game = Games.get(roomId);
        //pego o jogador pelo socketId
        let player: "X" | "O" | null = null;
        if(game?.players.X?.socketId === socket.id){
            player = "X";
        }else if(game?.players.O?.socketId === socket.id){
            player = "O";
        };
        //verifico se é a vez do jogador
        if(player !== game?.currentPlayer){
            return;
        };
        //verifico se a posição está livre
        if(game?.board[position] !== null){
            return;
        };
        //marco a jogada no tabuleiro
        game.board[position] = player;
        //salvo a jogada do jogador
        if(player === "X"){
            game.moves.X.push(position);
        }else{
            game.moves.O.push(position);
        }
        //se for a quarta jogada eu removo a primeira
        if(game.moves.X.length > 3){
            
            const firstMove = game.moves.X.shift();
            game.board[firstMove!] = null;
        }
        if(game.moves.O.length > 3){
            const firstMove = game.moves.O.shift();
            game.board[firstMove!] = null;
        }
        //atualizo o tabuleiro
        Games.set(roomId, game);
        //verifico se alguém ganhou
        //const winner = checkWinner(game.board);
        //envio o tabuleiro atualizado para os jogadores
        if(game.currentPlayer === "X"){
            game.currentPlayer = "O";
        }else{
            game.currentPlayer = "X";
        }
        io.to(roomId).emit("game:board", {
            board: game.board,
            currentPlayer: game.currentPlayer,
            moves: game.moves
        });
        //se alguém ganhou, envio a mensagem de vitória para os jogadores
        
        //se ninguém ganhou, envio a mensagem de vez para o próximo jogador
    });

    // socket.on("game:play",()=>{});
    // socket.on("game:restart",()=>{});
    // games.delete(roomId);
}