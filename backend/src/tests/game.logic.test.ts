import { describe, expect, it } from "vitest";
import { addWinnerPoint, checkWinner, switchPlayer, type Winner } from "../socket/game/game.logic";
import { createGame } from "../socket/game/game.factory";
import type { Game } from "../socket/handlers/game.state";

describe("CheckWinner", ()=>{

    it.each([
        [[
            "X", "X", "X",
            null, null, null,
            null, null, null
        ], {
            "boardWinner": [
            0,
            1,
            2,
            ],
            "player": "X",
        }],

        [[
            null, null, null,
            "O", "O", "O",
            null, null, null
            ], {
            "boardWinner": [
            3,
            4,
            5,
            ],
            "player": "O",
        }],

        [[
            "X", null, null,
            "X", null, null,
            "X", null, null
        ], {
            "boardWinner": [
            0,
            3,
            6,
            ],
            "player": "X",
        }], 

        [[
            null, "O", null,
            null, "O", null,
            null, "O", null
        ], {
            "boardWinner": [
            1,
            4,
            7,
            ],
            "player": "O",
        }],

        [[
            "X", null, null,
            null, "X", null,
            null, null, "X"
        ], {
            "boardWinner": [
            0,
            4,
            8,
            ],
            "player": "X",
        }],

        [[
            null, null, "O",
            null, "O", null,
            "O", null, null
        ], {
            "boardWinner": [
            2,
            4,
            6,
            ],
            "player": "O",
        }],
    ])("Should return %s", (board, expected) => {
        expect(checkWinner(board as ("X"|"O"|null)[])).toEqual(expected);
    });

    it("Should return null", ()=>{
        const board = Array(9).fill(null);
        expect(checkWinner(board)).toBeNull();
    })

})

describe("Reset Game", () => {
  it("Should reset the game state when a winner is registered", () => {
    // 1. Configuração inicial (Arrange)
    const roomId = "roomId";
    const game = createGame(roomId, "userId", "socketId");
    
    // Simula um estado de jogo em andamento/finalizado
    game.moves["X"] = [0,3,6];
    game.moves["O"] =[1,2,8];
    game.board = ["X", "O", "O", "X", null, null, "X", null, "O"]; 
    game.currentPlayer = "X";

    // Objeto mock do vencedor (supondo que o jogador "X" ganhou)
    const winner: Winner = { player: "X", boardWinner: [0,3,6] };

    // 2. Execução da lógica (Act)
    addWinnerPoint(winner, game); 

    // 3. Verificações (Assert)
    expect(game.moves.X).toEqual([]);
    expect(game.moves.O).toEqual([]);

    expect(game.board.every(cell => cell === null)).toBe(true);

    expect(game.score["X"]).toBe(1);

    expect(game.currentPlayer).toBe("O");
  });
});

