import "./common/env";
import routes from "./routes";
const Express = require("express");
const app = new Express();
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8000",
    // methods: ["GET", "POST"],
  },
});
import cors from "cors";

app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || "100kb",
  })
);
app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || "100kb" }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cors());

routes(app);

io.on("connection", (socket) => {
  socket.on("getLanguage", function (lang) {
    console.log("server " + lang);
    io.emit("setLanguage", lang);
  });

  socket.on("getInput", function (input) {
    console.log("server " + input);
    io.emit("setInput", input);
  });
  socket.on("getOutput", function (output) {
    console.log("server " + output);
    io.emit("setOutput", output);
  });

  socket.on("getCodeExec", function (code) {
    console.log("server " + code);
    io.emit("setCodeExec", code);
  });
});

http.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
