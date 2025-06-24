import { Prisma } from "../generated/prisma";
import { AuthenticatedSocket } from "../types/socket";

export type Message = Prisma.MessageGetPayload<{}>;
export type MessageWhereUnique = Prisma.MessageWhereUniqueInput;
export type CreateMessage = Prisma.MessageCreateInput;
// export type ReceivedMessage= {
//     type: string,
//     text: string?,
//     mediaUrl: string?,
//     senderId: number,
//     chatId: number,
//     chatAsLastMessageId: number
// }

export interface IMessageServerEvents {
	newMessage: (data: INewMessagePayload) => void;
}

export interface IMessageClientEvents {
	sendMessage: (data: ISendMessagePayload) => void;
}
export interface INewMessagePayload {
	text: string | null;
	mediaUrl: string | null;
	type: string;
	chatId: number;
	createdAt: Date;
	senderId: number;
}
export interface ISendMessagePayload {
	text: string | null;
	mediaUrl: string | null;
	type: string;
	chatId: number;
}

export interface IMessageSocketController {
	sendMessage: (socket: AuthenticatedSocket, data: ISendMessagePayload) => void;
	newMessage: (socket: AuthenticatedSocket, data: INewMessagePayload) => void;
	registerMessageControllers: (socket: AuthenticatedSocket) => void;
}
