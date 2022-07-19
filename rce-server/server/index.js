import './common/env';
import routes from './routes';
import database from './database';
const Express = require('express');
const app = new Express();
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8000'
    // methods: ["GET", "POST"],
  }
});
import cors from 'cors';

import interviewSocketIO from './interviewSocketIO';

database();

app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '100kb'
  })
);
app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cors());

routes(app);

io.on('connection', socket => {
  console.log(socket.rooms);

  socket.on('joinRoom', (roomId, token, name) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('userConnected', token, socket.id, name);

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('userDisconnected', token);
    });
  });

  socket.on('sendNewUser', (token, socketId,name) => {
    socket.to(socketId).emit('fromOldUser', token,name);
  });

  interviewSocketIO(socket);

  // socket.on("disconnect",()=>{
  //   console.log("User disconnected");
  //   // console.log(socket.adapter.rooms);
  // })
});

http.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
