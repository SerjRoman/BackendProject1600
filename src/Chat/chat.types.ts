import { Prisma } from "../generated/prisma";
import { Message } from "../Message/message.types";
import { Result } from "../tools/result";

export type Chat = Prisma.ChatGetPayload<{}>;
export type ChatWhereUnique = Prisma.ChatWhereUniqueInput;
export type CreateChat = Prisma.ChatCreateInput;
// export type ReceivedChat = {
//     chat: string
// }

export interface IChatServerEvents {
	chatUpdate: (data: { chatId: number; lastMessage: Message }) => void;
}

export interface IChatClientEvents {
	joinChat: (
		data: { chatId: number },
		callback: (response: Result<string>) => void
	) => void;
	leaveChat: (data: { chatId: number }) => void;
}
