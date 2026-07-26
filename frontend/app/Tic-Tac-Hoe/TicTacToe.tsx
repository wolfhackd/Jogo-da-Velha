import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Board } from "./board";
import { useEffect } from "react";
import { socket } from "~/config/socket/socket"
import { useParams } from "react-router";


//Tenho que fazer ele pegar o parametro da rota para criar esse jogo
export default function TicTacToe() {
  const {roomId} = useParams();

  useEffect(()=>{
    socket.connect();
    
    if(roomId){
      console.log("Conectando na sala de testes:", roomId);
      socket.emit('room:join',roomId);
    }
    
    return () => {
      socket.disconnect();
    }
  },[roomId])


  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <Card className="w-fit">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            Jogo da Velha
          </CardTitle>

          <CardDescription>
            {/* Sempre começa em X */}
            Vez de <span className="font-bold text-blue-500">X</span>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                {/* Devo considerar que o player pode ainda não estar em sala */}
                <span>Mad</span>
                <span className="font-bold text-blue-500">X</span>
              </div>
              <span>1:0</span>
              <div className="flex flex-col">
                {/* Devo considerar que o player pode ainda não estar em sala */}
                <span>Wolf</span>
                <span className="font-bold text-red-500">O</span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Board />
        </CardContent>
      </Card>
    </main>
  );
}