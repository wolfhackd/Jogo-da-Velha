import Home from "~/Home/Home";
import type { Route } from "./+types/home";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "My TicTacToe" },
    { name: "description", content: "Welcome to TicTacToe!" },
  ];
}

export default function HomeRoute() {
  return < Home/>;
}
