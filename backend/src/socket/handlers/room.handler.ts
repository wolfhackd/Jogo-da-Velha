import { Server, Socket } from "socket.io";
import { Games } from "./game.state";

export function roomHandler(io: Server, socket: Socket) {

    socket.on("room:join", (roomId: string) =>{
        let game = Games.get(roomId);

        if(game) {
            
            //reconnect x e o
            if(game.players.X === socket.data.userId) {
                game.players.X = socket.id;

                socket.join(roomId);

                socket.emit("game:reconnected", {
                    socketId: socket.id,
                    symbol: "X",
                });
                
                Games.set(roomId, game);
                return;

            } else if(game.players.O === socket.data.userId) {
                game.players.O = socket.id;

                socket.emit("game:reconnected", {
                    socketId: socket.id,
                    symbol: "O",
                });                
                
                Games.set(roomId, game);
                socket.join(roomId);

                io.to(roomId).emit("game:start",{
                    game: game
                })

                return;
            }
            
            //caso o jogo nao esteja cheio
            if (game.players.O === null) {
                game.players.O = socket.id;

                socket.join(roomId);

                socket.emit("game:joined", {
                    socketId: socket.id,
                    symbol: "O",
                });

                Games.set(roomId, game);

                io.to(roomId).emit("game:start",{
                    game: game
                })

                return;
            }

            // Sala cheia
            socket.emit("game:error", {
                message: "Room full",
            });

            return;
        }
        //Criar sala
        game = {
            roomId: roomId,
            board: Array(9).fill(null),
            currentPlayer: "X",
            players: {
                X: socket.id,
                O: null
            },
            moves: {
                X: [],
                O: []
            }
        }
        
        Games.set(roomId, game);
        socket.join(roomId);

        socket.emit("game:joined", {
            socketId: socket.id,
            symbol: "X",
        });
   })
    
}