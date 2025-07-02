import { IMessageSocketController } from "./message.types";
import { MessageService } from "./message.service";

export const MessageSocketController: IMessageSocketController = {
	registerMessageControllers: (socket, ioServer) => {
		socket.on("sendMessage", (data) => {
			MessageSocketController.sendMessage(socket, ioServer, data);
		});
	},
	sendMessage: async function (socket, ioServer, data) {
		const message = await MessageService.createMessage({
			data,
			userId: socket.data.userId,
		});
		if (message.status === "failure") {
			console.log(message.message);
			return;
		}
		console.log(message.data);
		ioServer
			.to(`chat_${message.data.chatId}`)
			.emit("newMessage", message.data);
	},
	newMessage: async function newMessage(data) {},
};
