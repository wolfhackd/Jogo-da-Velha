import { Board } from "./board";

export function TicTacToe() {
  return (
    <main>
      <div className="flex-col h-screen">
        <p>Jogo da Velha</p>
        <div>
          <Board />
        </div>
      </div>
    </main>
  );
}