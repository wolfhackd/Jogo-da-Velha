import { useState } from "react";
import { Square } from "./square";


export function Board() {

    const [board, setBoard] = useState<(null | 'X' | 'O')[]>(Array(9).fill(null));

    //Posso passar o onclick no componente diretamente

    function handleClick(value: string | null) {
        console.log(value);
    }

    return (
        <div className="board">
            {board.map((value, index) => (
                <Square key={index} value={value} onClick={() =>handleClick(value)}/>
            ))}
        </div>
    );
}