import { Prisma } from "../generated/prisma";
import { Message } from "../Message/message.types";
import { Result } from "../tools/result";
// По типам
// Проще сделать следующее:
// Принимать не весь тип который требует ChatGetPayload, а только необходимое нам include
// Теперь T наследуется от ChatInclude и используются только для Include
// До этого тип T был очень большим и излшине тяжелым, сейчас он относится только к include
export type Chat<T extends ChatInclude = {}> = Prisma.ChatGetPayload<{
	include: T;
}>;

export type ChatWhereUnique = Prisma.ChatWhereUniqueInput;
export type CreateChat = Prisma.ChatCreateInput;
export type ChatInclude = Prisma.ChatInclude;

export interface IChatServerEvents {
	chatUpdate: (data: IChatUpdatePayload) => void;
}

export interface IChatClientEvents {
	// Также не забываем типизировать колбэк
	joinChat: (data: IJoinChatPayload, callback: JoinChatCallback) => void;
	leaveChat: (data: ILeaveChatPayload) => void;
}

export interface IJoinChatPayload {
	chatId: number;
}
export interface ILeaveChatPayload {
	chatId: number;
}
export interface IChatUpdatePayload {
	chatId: number;
	lastMessage: Message;
}

export type JoinChatCallback = (
	response: Result<Chat<{ messages: true; participants: true }>>
) => void;

// Вот этот тип называется контракт. Можно также выносить в отдельный файл chat.contract.ts
export interface IChatService {
	joinChat: (chatId: number) => Promise<Result<Chat<{ messages: true; participants: true }>>>
}
