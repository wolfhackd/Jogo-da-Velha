import fastify from "fastify";
import cors from "@fastify/cors";
import { Server } from "socket.io";

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

io.on("connection", (socket)=>{
    console.log("a user conected");
});

app.listen({host: "0.0.0.0", port: PORT as number }, ()=>{
    console.log("server running on port ")
})