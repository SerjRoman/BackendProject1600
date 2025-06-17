import { Result } from "../tools/result";
import { ChatRepository } from "./chat.repository";
import { Chat } from "./chat.types";

export const ChatService = {
	joinChat: async function (
		chatId: number
        // Здесь также нужно указать что функция возвращает тип Chat с необходимым include
	): Promise<Result<Chat<{ messages: true; participants: true }>>> {
        // Дженериком указываем этот тип
		return await ChatRepository.getChat<{
			messages: true;
			participants: true;
		}>({ id: chatId }, { messages: true, participants: true });
	},
};
