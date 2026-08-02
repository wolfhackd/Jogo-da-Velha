
type Game = {
    roomId: string;
    board: ( "X" | "O" | null)[];
    currentPlayer: "X" | "O";

    players: {
        X: string | null;
        O: string | null;
    }

    moves: {
        X: number[];
        O: number[];
    }
}

export const Games = new Map<string, Game>();   