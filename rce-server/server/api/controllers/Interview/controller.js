import Server from "../../../common/server";

export class Controller {
  async connect(req, res) {
    const io = new Server().socketListen();
    console.log(io);
    const uid = req.params.uid;

    io.on("connection", function (socket) {
      // (2): The server recieves a ping event
      // from the browser on this socket
      socket.on("ping", function (data) {
        console.log("socket: server recieves ping (2)");

        // (3): Return a pong event to the browser
        // echoing back the data from the ping event
        socket.emit("pong", data);

        console.log("socket: server sends pong (3)");
      });
    });
  }
}

export default new Controller();
