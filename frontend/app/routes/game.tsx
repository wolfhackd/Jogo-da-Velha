import TicTacToe from "../modules/Tic-Tac-Hoe/TicTacToe";

export function meta() {
  return [
    { title: "My TicTacToe" },
    { name: "description", content: "Welcome to TicTacToe!" },
  ];
}

export default function Game() {
  return <TicTacToe />;
}
