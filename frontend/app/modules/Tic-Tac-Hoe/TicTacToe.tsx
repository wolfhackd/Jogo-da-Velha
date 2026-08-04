import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Board, type Game } from "./board";
import { useEffect, useState } from "react";
import { socket } from "~/config/socket/socket";
import { useNavigate, useParams } from "react-router";

export default function TicTacToe() {
  const {roomId} = useParams();
  const [ready,setReady] = useState(false);
  const [game, setGame] = useState<Game | null>(null);
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
      const id = localStorage.getItem("userId");
      if(id) setUserId(id);
  }, []);

  useEffect(()=>{
    const id = localStorage.getItem("userId");
    socket.auth = { userId: id };

    if(socket.connected) return;
    
    socket.connect();
  },[]);

  useEffect(() => {
    const handleJoined = (data: { socketId: string; symbol: "X" | "O" }) => {
      console.log("Entrou:", data);
      localStorage.setItem("userId", data.socketId);
    };

    const handleReconnected = (data: { socketId: string; symbol: "X" | "O" }) => {
      console.log("Reconectou:", data);
      localStorage.setItem("userId", data.socketId);
    };

    const handleGameStart = (data: Game) =>{
        console.log("Jogo iniciado:", data);
        setGame(data);
        setReady(true);
    };

    const handleGameError = (data: { message: string }) => {
        console.log("Erro:", data.message);
        navigate("/");
    }

    socket.on("game:joined", handleJoined);
    socket.on("game:reconnected", handleReconnected);
    socket.on("game:start", handleGameStart);
    socket.on("game:error", handleGameError);

    socket.emit("room:join", roomId);

    return () => {
        socket.off("game:joined", handleJoined);
        socket.off("game:reconnected", handleReconnected);
        socket.off("game:start", handleGameStart);
        socket.off("game:error", handleGameError);  
    };
}, [roomId]);
  
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <Card className="w-fit">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            Jogo da Velha
          </CardTitle>

          <CardDescription>
            {/* Sempre começa em X */}
            {/* Vez de <span className="font-bold text-blue-500">{game?.currentPlayer}</span> */}
            Vez de <span className="font-bold text-blue-500">{game?.currentPlayer}</span>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                {/* Devo considerar que o player pode ainda não estar em sala */}
                <span>Player 1</span>
                <span className="font-bold text-blue-500">X</span>
              </div>
              <span>1:0</span>
              <div className="flex flex-col">
                {/* Devo considerar que o player pode ainda não estar em sala */}
                <span>Player 2</span>
                <span className="font-bold text-red-500">O</span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className={(ready ? "" :  "pointer-events-none") + " flex justify-center" } >
          <Board game={game}  />
        </CardContent>
      </Card>
    </main>
  );
}