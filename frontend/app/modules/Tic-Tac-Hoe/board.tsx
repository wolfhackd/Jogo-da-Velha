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
  }

};

type GameProps = {
    game: Game | null;
};

export function Board({ game }: GameProps) {

    const [localGame, setGame] = useState<Game | null>(null);

    useEffect(()=>{
        setGame(game);
    },[game]);

    // const winConditions = [
    //     [0,1,2],
    //     [3,4,5],
    //     [6,7,8],
    //     [0,3,6],
    //     [1,4,7],
    //     [2,5,8],
    //     [0,4,8],
    //     [2,4,6]
    // ];



    // function checkWinner(newBoard: ("X" | "O" | null)[]){
    //     for (const condition of winConditions) {
    //         const [a,b,c] = condition;

    //         if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
    //             return newBoard[a];
    //         }
    //     }
    //     return null;
    // };

    function handleClick(index: number) {
        socket.emit('game:play', index, localGame?.roomId);
        console.log("Clicou na posição:", index);
    };

    return (
        <div className="board">
            {localGame?.board.map((value, index) => (
                <Square key={index} value={value} onClick={() =>handleClick(index)}/>
            ))}
        </div>
    );
}