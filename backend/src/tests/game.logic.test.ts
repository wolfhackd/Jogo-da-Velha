import { describe, expect, it } from "vitest";
import { checkWinner } from "../socket/game/game.logic";

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