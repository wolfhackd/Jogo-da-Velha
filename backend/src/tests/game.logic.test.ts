import { describe, expect, it } from "vitest";
import { checkWinner, switchPlayer } from "../socket/game/game.logic";
import { createGame } from "../socket/game/game.factory";

describe("CheckWinner", ()=>{

    it.each([
        [[
            "X", "X", "X",
            null, null, null,
            null, null, null
        ], "X"],

        [[
            null, null, null,
            "O", "O", "O",
            null, null, null
        ], "O"],

        [[
            "X", null, null,
            "X", null, null,
            "X", null, null
        ], "X"],

        [[
            null, "O", null,
            null, "O", null,
            null, "O", null
        ], "O"],

        [[
            "X", null, null,
            null, "X", null,
            null, null, "X"
        ], "X"],

        [[
            null, null, "O",
            null, "O", null,
            "O", null, null
        ], "O"],
    ])("Should return %s", (board, expected) => {
        expect(checkWinner(board as ("X"|"O"|null)[])).toBe(expected);
    });

    it("Should return null", ()=>{
        const board = Array(9).fill(null);
        expect(checkWinner(board)).toBeNull();
    })

})

describe("SwitchPlayer", ()=>{

    it("Should switch player to O",()=>{
        const game = createGame("roomId", "userId", "socketId");
        //initial player X
        expect(switchPlayer(game)).toEqual({ currentPlayer: "O" });
    })

    it("Should switch player to X", () =>{
        const game = createGame("roomId", "userId", "socketId");
        game.currentPlayer = "O";
        expect(switchPlayer(game)).toEqual({ currentPlayer: "X" });
    })
})