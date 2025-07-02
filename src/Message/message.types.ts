import { Prisma } from "../generated/prisma";
import { Result } from "../tools/result";
import { AuthenticatedSocket, ServerSocket } from "../types/socket";

export type Message = Prisma.MessageGetPayload<{}>;
export type MessageWhereUnique = Prisma.MessageWhereUniqueInput;
export type CreateMessage = Prisma.MessageUncheckedCreateInput;
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
export type INewMessagePayload = Message;
export interface ISendMessagePayload {
	text: string | null;
	mediaUrl: string | null;
	type: string;
	chatId: number;
}

export interface IMessageSocketController {
	sendMessage: (
		socket: AuthenticatedSocket,
        ioServer: ServerSocket,
		data: ISendMessagePayload
	) => void;
	newMessage: (socket: AuthenticatedSocket, data: INewMessagePayload) => void;
	registerMessageControllers: (
		socket: AuthenticatedSocket,
		ioServer: ServerSocket
	) => void;
}

export interface IMessageService {
	createMessage: ({
		data,
		userId,
	}: {
		data: ISendMessagePayload;
		userId: number;
	}) => Promise<Result<Message>>;
}
