import { IMessageSocketController } from "./message.types";

export const MessageSocketController: IMessageSocketController = {
	registerMessageControllers: (socket) => {
		socket.on("sendMessage", (data) => {
			MessageSocketController.sendMessage(socket, data);
		});
	},
	sendMessage: async function (data) {},
	newMessage: async function newMessage(data) {},
};
