import { useEffect, useState } from "react";
import { Square } from "./square";


export function Board() {

    const [board, setBoard] = useState<(null | 'X' | 'O')[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<'X'|'O'>('X');
    const [xMoves, setXMoves] = useState<number[]>([]);
    const [oMoves, setOMoves] = useState<number[]>([]);


    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    function checkWinner(newBoard: ("X" | "O" | null)[]){
        for (const condition of winConditions) {
            const [a,b,c] = condition;

            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                return newBoard[a];
            }
        }
        return null;
    }

    function handleClick(index: number) {
        if (board[index]) return;

        const newBoard = [...board];

        //Remove primeira jogada
        if (currentPlayer === 'X') {
            const nextMoves = [...xMoves, index];

            if (nextMoves.length > 3) {
                const oldestMove = nextMoves.shift();
                if (oldestMove !== undefined) {
                    newBoard[oldestMove] = null;
                }
            }
            newBoard[index] = 'X';
            setXMoves(nextMoves);
        } else { // Removido o 'if (currentPlayer === 'O')' redundante
            const nextMoves = [...oMoves, index];

            if (nextMoves.length > 3) {
                const oldestMove = nextMoves.shift();
                if (oldestMove !== undefined) {
                    newBoard[oldestMove] = null;
                }
            }
            newBoard[index] = 'O';
            setOMoves(nextMoves);
        }

        newBoard[index] = currentPlayer;

        setBoard(newBoard);
        
        const winner = checkWinner(newBoard);
        
        if (winner) {
            alert(`${winner} venceu!`);
        }

        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        
                
    }



    return (
        <div className="board">
            {board.map((value, index) => (
                <Square key={index} value={value} onClick={() =>handleClick(index)}/>
            ))}
        </div>
    );
}