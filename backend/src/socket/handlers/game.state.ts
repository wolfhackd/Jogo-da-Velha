export interface Player { 
    userId: string;
    socketId: string; 
    }; 

export interface Game {
    roomId: string;
    board: ("X" | "O" | null)[];
    currentPlayer: "X" | "O";
    players: {
        X: Player | null;
        O: Player | null; 
    };
    moves: {
        X: number[];
        O: number[];
    };
} 
export const Games = new Map<string, Game>();

// type Game = {
//     roomId: string;
//     board: ( "X" | "O" | null)[];
//     currentPlayer: "X" | "O";

//     players: {
//         X: string | null;
//         O: string | null;
//     }

//     moves: {
//         X: number[];
//         O: number[];
//     }
// }

// export const Games = new Map<string, Game>();   