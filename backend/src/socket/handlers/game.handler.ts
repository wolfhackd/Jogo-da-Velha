import { Server, Socket } from "socket.io";
import { Games } from "./game.state";


export function gameHandler(io: Server, socket: Socket){
    

    socket.on("game:play", ({ position, roomId }) => {
        console.log("game:play", position, roomId);
        //pego o jogo pelo roomId
        const game = Games.get(roomId);
        //pego o jogador pelo socketId
        const player = game?.players.X === socket.id ? "X" : game?.players.O === socket.id ? "O" : io.to(socket.id).emit("game:error", { message: "Você não está participando deste jogo." });
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
        //atualizo o tabuleiro
        Games.set(roomId, game);
        //verifico se alguém ganhou
        //const winner = checkWinner(game.board);
        //envio o tabuleiro atualizado para os jogadores
        io.to(roomId).emit("game:board", {
            board: game.board,
            currentPlayer: game.currentPlayer,
        });
        //se alguém ganhou, envio a mensagem de vitória para os jogadores
        
        //se ninguém ganhou, envio a mensagem de vez para o próximo jogador
    });

    // socket.on("game:play",()=>{});
    // socket.on("game:restart",()=>{});
    // games.delete(roomId);
}