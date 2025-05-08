import { client, PrismaKnownError } from "../prisma/client";
import { ErrorCodes, PrismaErrorCodes } from "../types/error-codes";
import { FindUser, User } from "./user.types";
export const UserRepository = {
	find: async (where: FindUser): Promise<User | ErrorCodes> => {
		try {
			const user = await client.user.findUniqueOrThrow({
				where,
				omit: {
					password: true,
				},
			});
			return user;
		} catch (err) {
			if (err instanceof PrismaKnownError) {
				switch (err.code) {
					case PrismaErrorCodes.UNIQUE:
						return ErrorCodes.EXISTS;
					case PrismaErrorCodes.NOT_EXIST:
						return ErrorCodes.NOT_FOUND;
					default:
						return ErrorCodes.UNHANDLED;
				}
			}
			return ErrorCodes.UNHANDLED;
		}
	},
};
