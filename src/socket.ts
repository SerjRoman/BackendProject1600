import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";
import {
	AppClientEvents,
	AppServerEvents,
	AuthenticatedSocket,
	SocketData,
} from "./types/socket";
import { ChatSocketController } from "./Chat/chat.socket.controller";

export function initSocketServer(httpServer: HTTPServer) {
	const ioServer = new SocketServer<
		AppClientEvents,
		AppServerEvents,
		{},
		SocketData
	>(httpServer);
	// ioServer.use(authenticateSocket)
	ioServer.on("connection", (socket: AuthenticatedSocket) => {
		console.log(socket.id);
		ChatSocketController.registerChatControllers(socket);
	});
}
