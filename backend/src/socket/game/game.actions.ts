import type { Game } from "../handlers/game.state";



export const playMove = (game: Game,position: number, player: "X" | "O") => {

    if(player !== game?.currentPlayer){
        return;
    };

    if(game?.board[position] !== null){
        return;
    };
    
    game.board[position] = player;
    
    game.moves[player].push(position);

    if(game.moves[player].length > 3){
        const firstMove = game.moves[player].shift();

        if(firstMove !== undefined){
            game.board[firstMove] = null;
        }
    }
    
};



