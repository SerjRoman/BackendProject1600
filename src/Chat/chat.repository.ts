import { client, PrismaKnownError } from "../prisma/client";
import { failure, Result, success } from "../tools/result";
import { ErrorCodes, PrismaErrorCodes } from "../types/error-codes";
import {
	Chat,
	ChatInclude,
	ChatWhere,
	ChatWhereUnique,
	CreateChat,
} from "./chat.types";

export const ChatRepository = {
	getChat: async function <T extends ChatInclude>(
		where: ChatWhereUnique,
		include: T
	): Promise<Result<Chat<T>>> {
		try {
			const chat = await client.chat.findUniqueOrThrow({
				where: where,
				include: include,
			});
			// Важно указать as, так как Prisma не может динамически определить тип chat, к сожалению
			// Указываем тот тип, который приходит по итогу из дженерика T
			return success(chat as Chat<T>);
		} catch (err) {
			if (err instanceof PrismaKnownError) {
				switch (err.code) {
					case PrismaErrorCodes.NOT_EXIST:
						return failure(ErrorCodes.NOT_FOUND);

					default:
						return failure(ErrorCodes.UNHANDLED);
				}
			}
			return failure(ErrorCodes.UNHANDLED);
		}
	},
	createChat: async function (data: CreateChat): Promise<Result<Chat>> {
		try {
			const chat = await client.chat.create({
				data: data,
			});
			return success(chat);
		} catch (err) {
			if (err instanceof PrismaKnownError) {
				switch (err.code) {
					case PrismaErrorCodes.UNIQUE:
						return failure(ErrorCodes.EXISTS);
					default:
						return failure(ErrorCodes.UNHANDLED);
				}
			}
			return failure(ErrorCodes.UNHANDLED);
		}
	},
	getAllChats: async function <T extends ChatInclude>(
		where: ChatWhere,
		include: T
	): Promise<Result<Chat<T>[]>> {
		try {
			const chat = await client.chat.findMany({
				where: where,
				include: include,
			});
			// Важно указать as, так как Prisma не может динамически определить тип chat, к сожалению
			// Указываем тот тип, который приходит по итогу из дженерика T
			return success(chat as Chat<T>[]);
		} catch (err) {
			if (err instanceof PrismaKnownError) {
				switch (err.code) {
					case PrismaErrorCodes.NOT_EXIST:
						return failure(ErrorCodes.NOT_FOUND);

					default:
						return failure(ErrorCodes.UNHANDLED);
				}
			}
			return failure(ErrorCodes.UNHANDLED);
		}
	},
	getChatsParticipantInfo: async (id: number) => {
		try {
			console.log(id);
			const chats = await client.chat.findMany({
				where: {
					participants: {
						some: {
							userId: id,
						},
					},
				},
				include: {
					participants: {
						where: {
							NOT: {
								userId: id,
							},
						},
						select: {
							userId: true,
						},
					},
					lastMessage: true,
				},
			});

			const participants = chats
				.map((chat) => {
					return chat.participants.at(0)?.userId;
				})
				.filter((participant) => {
					return participant !== undefined;
				});
			console.log(participants);
			const contacts = await client.contact.findMany({
				where: {
					ownerId: id,
					contactUserId: {
						in: participants,
					},
				},
			});
			const users = await client.user.findMany({
				where: {
					id: id,
				},
			});

			return success({ chats, contacts, users });
			// chats: [{userId: 2}, {userId: 3}]
			// {ownerId: 1, contactId: 2} {ownerId: 1, contactId: 3}
		} catch (err) {
			if (err instanceof PrismaKnownError) {
				switch (err.code) {
					case PrismaErrorCodes.NOT_EXIST:
						return failure(ErrorCodes.NOT_FOUND);

					default:
						return failure(ErrorCodes.UNHANDLED);
				}
			}
			return failure(ErrorCodes.UNHANDLED);
		}
	},
};
