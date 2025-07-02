import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";
import { AuthenticatedSocket, ServerSocket } from "./types/socket";
import { ChatSocketController } from "./Chat/chat.socket.controller";
import { MessageSocketController } from "./Message/message.socket.controller";
import { authenticateSocket } from "./middlewares/authenticate";

export function initSocketServer(httpServer: HTTPServer) {
	const ioServer = new SocketServer<ServerSocket>(httpServer);
	ioServer.use(authenticateSocket);
	ioServer.on("connection", (socket: AuthenticatedSocket) => {
		console.log(socket.id);
		socket.join(`personal_${socket.data.userId}`);
		ChatSocketController.registerChatControllers(socket);
		MessageSocketController.registerMessageControllers(socket, ioServer);
	});
}
