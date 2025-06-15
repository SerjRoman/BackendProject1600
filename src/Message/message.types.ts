import { Prisma } from "../generated/prisma";

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
	newMessage: (data: Message) => void;
}

export interface IMessageClientEvents {
	sendMessage: (data: CreateMessage) => void;
}
