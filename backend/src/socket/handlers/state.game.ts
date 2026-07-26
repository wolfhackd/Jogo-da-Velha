
type Game = {
  roomId: string;
  board: ("X" | "O" | null)[];
  currentPlayer: "X" | "O";
  winner: "X" | "O" | null;

  players: {
    X: string | null;
    O: string | null;
  };

  moves: {
    X: number[];
    O: number[];
  }

  // points: {
  //   X: number;
  //   O: number;
  // };
};


export const games = new Map<string, Game>();