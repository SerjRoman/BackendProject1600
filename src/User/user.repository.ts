import { Prisma } from "../generated/prisma";
import { client, PrismaKnownError } from "../prisma/client";
import {
	ErrorCodes,
	getErrorMessage,
	PrismaErrorCodes,
} from "../types/error-codes";
import { FindUser, User, UserWithOutPassword } from "./user.types";
export const UserRepository = {
	findWithOutPassword: async (where: FindUser): Promise<UserWithOutPassword | ErrorCodes> => {
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

    find: async (where: FindUser): Promise<User | ErrorCodes> => {
		try {
			const user = await client.user.findUniqueOrThrow({
				where,
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

	async findUserByEmail(email: string) {
		try {
			return await this.findWithOutPassword({ email });
            // return await UserRepository.find({email})
		} catch (err) {
			if (err instanceof PrismaKnownError) {
				console.log(err);
				return getErrorMessage(err.code);
			}
			return "Unexpected error";
		}
	},

	async findUserById(id: number) {
		try {
			return await this.findWithOutPassword({ id });
		} catch (err) {
			if (err instanceof PrismaKnownError) {
				console.log(err);
				return getErrorMessage(err.code);
			}
			return "Unexpected error";
		}
	},

	async createUser(data: Prisma.UserCreateInput) {
		try {
			return await client.user.create({
				data: data,
			});
		} catch (err) {
			if (err instanceof PrismaKnownError) {
				console.log(err);
				return getErrorMessage(err.code);
			}
			return "Unexpected error";
		}
	},
};
