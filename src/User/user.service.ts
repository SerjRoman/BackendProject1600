import { InferType } from "yup";
import { UserSchema } from "./user.schema";
import { UserRepository } from "./user.repository";
import { failure, Result, success } from "../tools/result";
import { sign } from "jsonwebtoken";
import { Config } from "../config/config";
import { CreateUser, User } from "./user.types";
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
        // bcrypt
		const token = sign(result, Config.SECRET_KEY, {
			expiresIn: Config.AUTH_TOKEN_TTL,
		});
		return success(token);
	},
    
    register: async (userData: CreateUser): Promise<Result<string>> => {
		const user = await UserRepository.findUserByEmail(userData.email);
		if (user) {
			return { status: "failure", message: "User exists" };
		}

		if (typeof user === "string") {
			return { status: "failure", message: "something wrong" };
		}

		if (!user) {
			return {
				status: "failure",
				message: "User wasn`t created successfully",
			};
		}

		return { status: "success", data: user };
	},

	user: async (id: number): Promise<Result<User>> => {
		const user = await UserRepository.findUserById(id);
		if (!user) {
			return { status: "failure", message: "user not found" };
		}
		if (typeof user === "string") {
			return { status: "failure", message: user };
		}
		return { status: "success", data: user };
	},
};
