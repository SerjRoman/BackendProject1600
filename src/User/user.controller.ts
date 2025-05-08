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
};
