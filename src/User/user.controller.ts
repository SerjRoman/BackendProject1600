import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { ErrorCodes } from "../types/error-codes";
import { failure } from "../tools/result";

export const UserController = {
	login: async (req: Request, res: Response, next: NextFunction) => {
		const result = await UserService.login(req.body);
		if (result.status === "failure") {
			next(result);
			return;
		}
		res.json(result);
	},
	register: async (req: Request, res: Response, next: NextFunction) => {
		const result = await UserService.register(req.body);
		if (result.status === "failure") {
			next(result);
			return;
		}
		res.json(result);
	},
	getMe: async (req: Request, res: Response, next: NextFunction) => {
        console.log(res.locals.userId)
		const userId: number = res.locals.userId;
		if (!userId) {
			next(failure(ErrorCodes.UNAUTHORIZED));
			return;
			// throw failure(ErrorCodes.UNAUTHORIZED)
		}
		const result = await UserService.getMe(userId);
		if (result.status === "failure") {
			next(result);
			return;
		}
		res.json(result);
	},

	getUserByUsername: async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const username: string = req.params.username;
		if (!username) {
			next(failure(ErrorCodes.NOT_FOUND));
			return;
		}
		const result = await UserService.getUserByUsername(username);

		if (result.status === "failure") {
			next(result);
			return;
		}
		res.json(result);
	},
};
