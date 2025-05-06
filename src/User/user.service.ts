import { InferType } from "yup";
import { UserSchema } from "./user.schema";
import { UserRepository } from "./user.repository";
import { failure, Result, success } from "../tools/result";
import { sign } from "jsonwebtoken";
import { Config } from "../config/config";
export const UserService = {
	login: async (
		data: InferType<typeof UserSchema.login>
	): Promise<Result<string>> => {
		const result = await UserRepository.find({
			email: data.email,
		});
		if (typeof result === "string") {
			return failure(result);
		}
		const token = sign(result, Config.SECRET_KEY, {
			expiresIn: Config.AUTH_TOKEN_TTL,
		});
		return success(token);
	},
};
