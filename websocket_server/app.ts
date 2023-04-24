import express from 'express';
import { createServer, Server } from 'http';
import * as socketIO from 'socket.io';

class App {
    public app: express.Application;
    public server: Server;
    private io: socketIO.Server;
    public PORT: number = 8100;

    constructor(){
        this.routes();
        this.sockets();
        this.listen();
    }

    routes (){
        this.app = express();
        this.app.route('/').get((req,res) => {
            res.status(200).send("Websocket is running!");
        });     
    }

    private sockets(): void {
        this.server = createServer(this.app);
        this.io = new socketIO.Server(this.server);
    }

    private listen(): void {
        this.io.on("connection", (socket: any) => {
            console.log("a user connected");

            socket.on("chat message",  (msg) => {
                console.log("message " + msg);
                socket.emit("chat message", msg)
            });

            socket.on("disconnect", () => {
                console.log("user disconnected");
            });
        });
    }
}

export default new App();