import Express from "express";
import cookieParser from "cookie-parser";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as os from "os";
import l from "./logger";
import oas from "./swagger";
import cors from "cors";
import socketio from "socket.io";

const app = new Express();
// var server = "";
var io = "";

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);

    app.set("appPath", `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || "100kb",
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
    app.use(cors());
  }

  router(routes) {
    this.routes = routes;
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = (p) => () =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || "development"
        } @: ${os.hostname()} on port: ${p}}`
      );

    oas(app, this.routes)
      .then(() => {
        const server = http.createServer(app).listen(port, welcome(port));
        io = socketio(server);
        // app.use(function (req, res, next) {
        //   req.io = io;
        //   next();
        // });

        // console.log(io);
      })
      .catch((e) => {
        l.error(e);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
      });
    // app.set(io)
    return app;
  }
  socketListen() {
    return io;
  }
}
