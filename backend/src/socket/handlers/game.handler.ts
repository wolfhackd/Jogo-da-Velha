import { Server, Socket } from "socket.io";
import { game } from "./state.game";



export function gameHandler(io: Server, socket: Socket){
    

    socket.on("game:play", (data) =>{
        // io.emit("game:play", data);
        

    })
}