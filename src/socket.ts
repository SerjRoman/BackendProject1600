import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";
import { authenticateSocket } from "./middlewares/authenticate";
import { AppClientEvents, AppServerEvents, SocketData } from "./types/socket";

export function initSocketServer(httpServer: HTTPServer) {
    const ioServer = new SocketServer<AppClientEvents, AppServerEvents, {}, SocketData>(httpServer)
    ioServer.use(authenticateSocket)

}


