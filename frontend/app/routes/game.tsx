import { TicTacToe } from "../Tic-Tac-Hoe/TicTacToe";
import type { Route } from "./+types/game";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My TicTacToe" },
    { name: "description", content: "Welcome to TicTacToe!" },
  ];
}

export default function Game() {
  return <TicTacToe />;
}
