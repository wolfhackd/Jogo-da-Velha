import { describe, expect, it } from "vitest";
import { createGame } from "../socket/game/game.factory";


describe("Create a Game", () =>{

    it("Create a Game and add first player", () =>{
        const game = createGame("roomId", "userId", "socketId");

        expect(game.roomId).toBe("roomId");
        expect(game.players.X?.userId).toBe("userId");
        expect(game.players.X?.socketId).toBe("socketId");
    })

    it("Error to create a game, roomId null", () =>{
        expect(() => {
        //@ts-ignore
        createGame(null, "null", "socketId");
    }).toThrow("roomId is required");
    })

    it("Error to create a game, roomId blank", () =>{
        expect(() => {
        //@ts-ignore
        createGame("", "null", "socketId");
    }).toThrow("roomId is required");
    })

    it("Error to create a game, roomId undefined", () =>{
        expect(() => {
        //@ts-ignore
        createGame(undefined, "null", "socketId");
    }).toThrow("roomId is required");
    })

    it("Error to create a game, userId null", () =>{
        expect(() => {
        //@ts-ignore
        createGame("roomId", null, "socketId");
    }).toThrow("userId is required");
    })

    it("Error to create a game, userId blank", () =>{
        expect(() => {
        //@ts-ignore
        createGame("roomId", "", "socketId");
    }).toThrow("userId is required");
    })

    it("Error to create a game, userId undefined", () =>{
        expect(() => {
        //@ts-ignore
        createGame("roomId", undefined, "socketId");
    }).toThrow("userId is required");
    })

    it("Error to create a game, socketId null", () =>{
        expect(() => {
        //@ts-ignore
        createGame("roomId", "null", null);
    }).toThrow("socketId is required");
    })

    it("Error to create a game, socketId blank", () =>{
        expect(() => {
        //@ts-ignore
        createGame("roomId", "null", "");
    }).toThrow("socketId is required");
    })

    it("Error to create a game, socketId undefined", () =>{
        expect(() => {
        //@ts-ignore
        createGame("roomId", "null", undefined);
    }).toThrow("socketId is required");
    })
})