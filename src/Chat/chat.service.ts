import { ChatRepository } from "./chat.repository";
import { IChatService } from "./chat.types";

// Типизацию функций сервиса можно сильно упростить за счет использования контрактов
// Контракт это тип, который определяет что требуется для работы функций сервиса и какой выход из них
export const ChatService: IChatService = {
	joinChat: async function (chatId) {
		// Дженериком указываем этот тип
		return await ChatRepository.getChat<{
			messages: true;
			participants: true;
		}>({ id: chatId }, { messages: true, participants: true });
	},
};
