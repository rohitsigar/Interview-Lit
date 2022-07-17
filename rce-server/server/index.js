import "./common/env";
import Server from "./common/server";
import routes from "./routes";

// console.log(Server().socketListen());

export default new Server().router(routes).listen(process.env.PORT);
