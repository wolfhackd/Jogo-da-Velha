import type { Game } from "../handlers/game.state";

export const createGame = (roomId: string, userId: string, socketId: string ): Game => {
    if(!roomId || roomId === null || roomId === undefined || roomId.trim() === "") {
        throw new Error("roomId is required");
    };

    if(!userId || userId === null || userId === undefined || userId.trim() === "") {
        throw new Error("userId is required");
    };

    if(!socketId || socketId === null || socketId === undefined || socketId.trim() === "") {
        throw new Error("socketId is required");
    };
    return{
            roomId,
            board: Array(9).fill(null),
            currentPlayer: "X",
            players: {
                X: {
                    userId,
                    socketId
                },
                O: null,
            },
            moves: {
                X: [],
                O: [],
            },
            score: {
                X: 0,
                O: 0,
            }   
        }
    }