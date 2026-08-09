import { useEffect, useState } from "react";
import { Square } from "./square";
import { socket } from "~/config/socket/socket";

export type Game = {
    roomId: string;
    board: ("X" | "O" | null)[];
    currentPlayer: "X" | "O";
    winner: "X" | "O" | null;

    players: {
        X: string | null;
        O: string | null;
    };

    moves: {
        X: (number)[];
        O: (number)[];
    },
    score: {
        X: number;
        O: number;
    }
};

type GameProps = {
    game: Game | null;
};

type GameUpdate = {
    board: ("X" | "O" | null)[];
    currentPlayer: "X" | "O";
    moves: {
        X: (number)[];
        O: (number)[];
    }
    // winner: "X" | "O" | null;
}

export function Board({ game }: GameProps) {

    const [localGame, setGame] = useState<Game | null>(null);

    useEffect(()=>{
        setGame(game);
    },[game]);

    useEffect(()=>{
        const handleGameUpdate = (data: GameUpdate) => {
            localGame && setGame({...localGame, ...data});
            console.log("Jogo atualizado:", data);
            console.log("Jogo local:", localGame);
        }

        socket.on("game:board", handleGameUpdate);

        return () => {
            socket.off("game:board", handleGameUpdate);
        }
    })

    function handleClick(index: number) {
        socket.emit('game:play', {position: index, roomId: localGame!.roomId});
        console.log("Clicou na posição:", index);
    };

    return (
        <div className="board">
            {localGame?.board.map((value, index) => (
                <Square key={index} value={value} onClick={() =>handleClick(index)}/>
            ))}
        </div>
    );
}