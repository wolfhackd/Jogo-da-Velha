import HomePage from "~/modules/Home/HomePage";



export function meta() {
  return [
    { title: "My TicTacToe" },
    { name: "description", content: "Welcome to TicTacToe!" },
  ];
}

export default function Home() {
  return < HomePage/>;
}
