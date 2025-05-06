import { Request, Response, NextFunction } from "express";
import { UserRepository } from "./user.repository";
import { Result } from "../tools/result";
import { CreateUser, User } from "./user.types";

export const UserService = {
	login: async (email: string, password: string): Promise<Result<User>> => {
		const user = await UserRepository.findUserByEmail(email);
		if (!user) {
			return { status: "failure", message: "User not found." };
		}

		if (typeof user === "string") {
			return { status: "failure", message: "Something wrong." };
		}

		return { status: "success", data: user };
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
