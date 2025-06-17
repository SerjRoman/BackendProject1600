import { AuthenticatedSocket } from "../types/socket";
import { ChatService } from "./chat.service";
import {
	IJoinChatPayload,
	ILeaveChatPayload,
	JoinChatCallback,
} from "./chat.types";

export const ChatSocketController = {
	registerChatControllers: function (socket: AuthenticatedSocket) {
		socket.on("joinChat", (data, ack) => {
			ChatSocketController.joinChat(socket, data, ack);
		});
		socket.on("leaveChat", (data) => {
			ChatSocketController.leaveChat(socket, data);
		});
	},

	joinChat: async function (
		socket: AuthenticatedSocket,
		data: IJoinChatPayload,
		ack: JoinChatCallback
	) {
		const chatRoomName = `chat_${data.chatId}`;
		const result = await ChatService.joinChat(data.chatId);
		socket.join(chatRoomName);
		// При работе в PostMan нужно обязательно поставить галочку на Ack рядом с событием.
		// Без этого socket.io не поймет что есть колбэк и не сможет его выполнить
		// Иначе говоря, когда клиент делает emit события, если он ждет колбэк он обязан его передать при emit
		// socket.emit('joinChat', {chatId: 5}, (callback) => {console.log("Колбэк сработает на сервере")})
		//  То есть, если клиент не отправит колбэк, то и сервер не сможет его выполнить
		// Проверка на typeof делается как раз на случай если нам не передали колбэк и код не вылетел по итогу
		if (typeof ack === "function") ack(result);
	},
	leaveChat: function (socket: AuthenticatedSocket, data: ILeaveChatPayload) {
		const chatRoomName = `chat_${data.chatId}`;
		socket.leave(chatRoomName);
	},
};
