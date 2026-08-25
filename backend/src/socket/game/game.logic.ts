import { Games, type Game } from "../handlers/game.state.js";

const winnerConditions: [number, number, number][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],                                        
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export const checkWinner = (board: (null | "X" | "O")[]): Winner | null => {
    for (const condition of winnerConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return {
                player: board[a],
                boardWinner: [a,b,c]
            };
        }
    }
    return null;
};

export const switchPlayer = (game: Game) => {
        
    if(game.currentPlayer === "X"){
        game.currentPlayer = "O";
    }else{
        game.currentPlayer = "X";
    }

    return { currentPlayer: game.currentPlayer };
}

export const gameReset = (game: Game) => {
    
    game.board.fill(null);
    game.moves.X = [];
    game.moves.O = [];
    Games.set(game.roomId,game);
};

export type Winner = {
    player: "X" | "O";
    boardWinner: [number,number,number]
}

export const addWinnerPoint = (winner: Winner, game: Game) => {
    game.score[winner.player] += 1;
    game.currentPlayer = winner.player === "X" ? "O" : "X";
    gameReset(game);
}