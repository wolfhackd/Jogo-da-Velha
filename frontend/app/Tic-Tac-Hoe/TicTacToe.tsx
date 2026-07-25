import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Board } from "./board";

export function TicTacToe() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <Card className="w-fit">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            Jogo da Velha
          </CardTitle>

          <CardDescription>
            Vez de <span className="font-bold text-blue-500">X</span>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span>Mad</span>
                <span className="font-bold text-red-500">O</span>
              </div>
              <span>1:0</span>
              <div className="flex flex-col">
                <span>Wolf</span>
                <span className="font-bold text-blue-500">X</span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Board />
        </CardContent>
      </Card>
    </main>
  );
}