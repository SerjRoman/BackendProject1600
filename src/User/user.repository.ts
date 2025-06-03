import { client, PrismaKnownError,  } from "../prisma/client";
import { failure, Result, success } from "../tools/result";
import { ErrorCodes, PrismaErrorCodes } from "../types/error-codes";
import { FindUser, User, UserWithoutPassword, CreateUser } from "./user.types";

export const UserRepository = {
	find: async (where: FindUser): Promise<Result<User>> => {
		try {
			const user = await client.user.findUniqueOrThrow({
				where,
			});
			return success(user);
		} catch (err) {
			if (err instanceof PrismaKnownError) {
				switch (err.code) {
					case PrismaErrorCodes.NOT_EXIST:
						return failure(ErrorCodes.NOT_FOUND)
					default:
						return failure(ErrorCodes.UNHANDLED);
				}
			}
			return failure(ErrorCodes.UNHANDLED);
		}
	},
	findWithoutPassword: async (where: FindUser): Promise<Result<UserWithoutPassword>> => {
		try {
			const user = await client.user.findUniqueOrThrow({
				where,
				omit:{
					password: true
				},
			});
			return success(user);
		} catch (err) {
			if (err instanceof PrismaKnownError) {
				switch (err.code) {
					case PrismaErrorCodes.UNIQUE:
						return failure(ErrorCodes.EXISTS)
					case PrismaErrorCodes.NOT_EXIST:
						return failure(ErrorCodes.NOT_FOUND) 
					default:
						return failure(ErrorCodes.UNHANDLED);
				}
			}
			return failure(ErrorCodes.UNHANDLED);
		}
	},
	create: async (data: CreateUser )  => {
		try{
			const user = await client.user.create({
				data: data
			})
			return success(user);
		} catch (err){
			if (err instanceof PrismaKnownError) {
				switch (err.code) {
					case PrismaErrorCodes.UNIQUE:
						return failure(ErrorCodes.EXISTS)
					default:
						return failure(ErrorCodes.UNHANDLED);
				}
			}
			return failure(ErrorCodes.UNHANDLED);
		}
	}
};


