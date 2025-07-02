import { ChatRepository } from "./chat.repository";
import { CreateChat, IChatService } from "./chat.types";

// Типизацию функций сервиса можно сильно упростить за счет использования контрактов
// Контракт это тип, который определяет что требуется для работы функций сервиса и какой выход из них
export const ChatService: IChatService = {
	joinChat: async function (chatId) {
		// Дженериком указываем этот тип
		const chat = await ChatRepository.getChat<{
			messages: true;
			participants: true;
		}>({ id: chatId }, { messages: true, participants: true });
		return chat;
	},
	getChats: async function getChats(userId: number) {
		return await ChatRepository.getAllChats<{
			lastMessage: true;
			participants: true;
		}>(
			{ participants: { some: { userId } } },
			{ lastMessage: true, participants: true }
		);
	},
	createChat: async function createChat(data) {
		const createChatData: CreateChat = {
			participants: {
				createMany: {
					data: [{ userId: data.userId }, { userId: data.contactId }],
				},
			},
		};
		return await ChatRepository.createChat(createChatData);
	},
	getChatsParticipantsInfo: async (id: number) => {
		return await ChatRepository.getChatsParticipantInfo(id);
	},
};
