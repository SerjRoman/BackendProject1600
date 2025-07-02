import { MessageRepository } from "./message.repository";
import { IMessageService } from "./message.types";

export const MessageService: IMessageService = {
	createMessage: async function ({ data, userId }) {
		const newData = {
			...data,
			senderId: userId,
			chatAsLastMessageId: data.chatId,
		};
        console.log(newData)
		return await MessageRepository.createMessage(newData);
	},
};
