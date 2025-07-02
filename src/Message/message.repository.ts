import { client, PrismaKnownError } from "../prisma/client";
import { Result, failure, success } from "../tools/result";
import { ErrorCodes, PrismaErrorCodes } from "../types/error-codes";
import { Message, CreateMessage, MessageWhereUnique } from "./message.types";

export const MessageRepository = {
	createMessage: async function (
		data: CreateMessage
	): Promise<Result<Message>> {
		try {
			const message = await client.message.create({
				data: data,
			});
			const chat = await client.chat.update({
				where: {
					id: message.chatAsLastMessageId,
				},
				data: {
					lastMessageId: message.id,
				},
			});
			return success(message);
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
	getMessage: async function (
		where: MessageWhereUnique
	): Promise<Result<Message>> {
		try {
			const message = await client.message.findUniqueOrThrow({
				where: where,
			});
			return success(message);
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
	getAllMessage: async function (): Promise<Result<Message[]>> {
		try {
			const message = await client.message.findMany();
			return success(message);
		} catch (err) {
			if (err instanceof PrismaKnownError) {
				switch (err.code) {
					default:
						return failure(ErrorCodes.UNHANDLED);
				}
			}
			return failure(ErrorCodes.UNHANDLED);
		}
	},
};
