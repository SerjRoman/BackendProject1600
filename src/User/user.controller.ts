import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";

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
		const data = req.body;
		const result = await UserService.register(data);

		if (result.status === "failure") {
			next(result);
		}
	},

	user: async (req: Request, res: Response, next: NextFunction) => {
        const userId = res.locals.userId;
		const result = await UserService.user(userId);
		res.json(result);
	},
};
