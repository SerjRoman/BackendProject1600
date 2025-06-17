import { client, PrismaKnownError } from "../prisma/client";
import { failure, Result, success } from "../tools/result";
import { ErrorCodes, PrismaErrorCodes } from "../types/error-codes";
import { Chat, ChatInclude, ChatWhereUnique, CreateChat } from "./chat.types";

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
};
