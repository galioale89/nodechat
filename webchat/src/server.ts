import * as express from "express";
import * as path from "path";

var debug = require('debug')('nodechat:server');

const app = express();
app.set("port", process.env.PORT || 3000);

var http = require("http").Server(app);

app.get("/", (req: any,res: any) => {
    res.sendFile(path.resolve("./views/index.html"));
});

let io = require("socket.io")(http);
io.on("connection", function(socket: any) {
    console.log("A user connected");
    socket.on("message", (message: any) => {
        console.log(message);
        io.emit("message", message);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});

http.listen(3000, ()=> {
    console.log("listening on *:3000");
});
http.on('listening', onListening);


function onListening() {
    var addr = http.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }