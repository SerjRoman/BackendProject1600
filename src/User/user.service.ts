import { InferType } from "yup";
import { UserSchema } from "./user.schema";
import { UserRepository } from "./user.repository";
import { failure, Result, success, IFailure } from "../tools/result";
import { sign } from "jsonwebtoken";
import { Config } from "../config/config";
import { compare, hash } from "bcryptjs";
import { ErrorCodes } from "../types/error-codes";
import { uploadImage } from "../tools/upload-image";

export const UserService = {
	login: async (
		data: InferType<typeof UserSchema.login>
	): Promise<Result<string>> => {
		const result = await UserRepository.find({
			email: data.email,
		});

		if (result.status === "failure") {
			return result;
		}
		const isMatch = await compare(data.password, result.data.password);
		if (!isMatch) {
			return failure(ErrorCodes.UNAUTHORIZED);
		}
		const token = sign({ userId: result.data.id }, Config.SECRET_KEY, {
			expiresIn: Config.AUTH_TOKEN_TTL,
		});
		return success(token);
	},
	register: async (
		data: InferType<typeof UserSchema.register>
	): Promise<Result<string>> => {
		const user = await UserRepository.find({ email: data.email });
		if (user.status === "failure" && user.code !== ErrorCodes.NOT_FOUND) {
			return user;
		}
		if (user.status === "success") {
			return failure(ErrorCodes.EXISTS);
		}

		const avatar = await uploadImage(data.avatar);

		const hashedPassword = await hash(data.password, 10);
		const hashedData = {
			...data,
			avatar: avatar.fileName,
			password: hashedPassword,
		};
		const newUser = await UserRepository.create(hashedData);
		if (newUser.status == "failure") {
			return newUser;
		}
		const token = sign({ userId: newUser.data.id }, Config.SECRET_KEY, {
			expiresIn: Config.AUTH_TOKEN_TTL,
		});

		return success(token);
	},
	getMe: async (userId: number) => {
		const user = await UserRepository.find({ id: userId });
		if (!user) {
			return failure(ErrorCodes.UNAUTHORIZED);
		}
		return success(user);
	},
	getUserByUsername: async (username: string) => {
		return await UserRepository.findWithoutPassword({ username: username });
	},
};
