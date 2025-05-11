import { InferType } from "yup";
import { UserSchema } from "./user.schema";
import { UserRepository } from "./user.repository";
import { failure, Result, success } from "../tools/result";
import { sign } from "jsonwebtoken";
import { Config } from "../config/config";
import { CreateUser, User, UserWithOutPassword } from "./user.types";
import { compare, hash } from "bcrypt";
export const UserService = {
	login: async (
		data: InferType<typeof UserSchema.login>,

	): Promise<Result<string>> => {
		const result = await UserRepository.find({
			email: data.email,
            password: data.password
		});

		if (typeof result === "string") {
			return failure(result);
		}

		const isMatch = await compare(data.password, result.password);

		if (!isMatch) {
			return { status: "failure", message: "Passwords are not similar" };
		}
		// bcrypt
		const token = sign(result, Config.SECRET_KEY, {
			expiresIn: Config.AUTH_TOKEN_TTL,
		});
		return success(token);
	},

	register: async (data: CreateUser): Promise<Result<string>> => {
		const user = await UserRepository.findUserByEmail(data.email);
		if (user) {
			return { status: "failure", message: "User exists" };
		}

		if (typeof user === "string") {
			return { status: "failure", message: "something wrong" };
		}

		const hashedPassword = await hash(data.password, 10);
		const hashedUserData = {
			...data,
			password: hashedPassword,
		};
		const newUser = await UserRepository.createUser(hashedUserData);
		if (typeof newUser === "string") {
			return { status: "failure", message: newUser };
		}

		if (!newUser) {
			return {
				status: "failure",
				message: "User wasn`t created successfully",
			};
		}
		const token = sign({ id: newUser.id }, Config.SECRET_KEY, {
			expiresIn: Config.AUTH_TOKEN_TTL,
		});

		return success(token);
	},

	user: async (id: number): Promise<Result<UserWithOutPassword>> => {
		const user = await UserRepository.findUserById(id);
		if (!user) {
			return { status: "failure", message: "user not found" };
		}
		if (typeof user === "string") {
			return { status: "failure", message: user };
		}
		return success(user);
	},
};
