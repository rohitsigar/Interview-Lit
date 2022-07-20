import { addUser, getUsersInRoom, removeUser } from "./socketutil";
const interviewSocketIO = (socket) => {
  socket.on("joinInterview", ({ email, roomId }) => {
    const { error, user } = addUser({ id: socket.id, email, room: roomId });
    //console.log(user);
    const users = getUsersInRoom(roomId);
    console.log(users);
    if (user) {
      socket.join(roomId);
      socket.emit("log", user);
      socket.in(roomId).emit("welcome", {
        text: `${user.email} has joined`,
      });
    }

    socket.on("getUsersInInterview", (roomId) => {
      const users = getUsersInRoom(roomId);
      socket.in(roomId).emit("setUsersInInterview", {
        users,
      });
    });

    socket.on("endInterview", () => {
      console.log("endIntere");
      const user = removeUser(email);
      socket.in(roomId).emit("end", {
        text: `${email} has left the interview`,
      });
    });
  });

  socket.on("getLanguage", (roomId, lang) => {
    socket.in(roomId).emit("setLanguage", lang);
  });

  socket.on("getInput", (roomId, input) => {
    socket.in(roomId).emit("setInput", input);
  });

  socket.on("getOutput", (roomId, output) => {
    socket.in(roomId).emit("setOutput", output);
  });

  socket.on("getError", (roomId, error) => {
    socket.in(roomId).emit("setError", error);
  });

  socket.on("getCodeExec", (roomId, code) => {
    socket.in(roomId).emit("setCodeExec", code);
  });
};

export default interviewSocketIO;
