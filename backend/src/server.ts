import fastify from "fastify";
import cors from "@fastify/cors";
import { Server } from "socket.io";
import { registerConnection } from "./socket/connection.js";
import { socketMiddleware } from "./socket/middleware/middleware.js";

const PORT = 8000;
const app = fastify();

app.register(cors, {
    origin: "*"
});

const io = new Server(app.server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.use(socketMiddleware);

io.on("connection", (socket)=>{
    registerConnection(io, socket);
});

app.listen({host: "0.0.0.0", port: PORT as number }, ()=>{
    console.log(`Server running on port ${PORT}, http://localhost:${PORT}`);
})