import { useEffect, useState } from "react";
import { Square } from "./square";


export function Board() {

    const [board, setBoard] = useState<(null | 'X' | 'O')[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<'X'|'O'>('X');

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

    //Aqui eu tenho que fazer o logica do game (depois eu modularizo)
    //posso começar no x (apenas para testes eu faço sempre comecar por x)

    function handleClick(index: number) {
        if (board[index]) return;

        const newBoard = [...board];

        newBoard[index] = currentPlayer;

        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

        //falta adicionar a condição de no máximo 3 jogadas
        
    }

    useEffect(() => {
        checkWinner();
    }, [board]);


    function checkWinner(){
        winConditions.forEach((condition)=>{
            const [a,b,c] = condition;

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                alert(`${board[a]} venceu!`)
            }

        })
    }

    return (
        <div className="board">
            {board.map((value, index) => (
                <Square key={index} value={value} onClick={() =>handleClick(index)}/>
            ))}
        </div>
    );
}