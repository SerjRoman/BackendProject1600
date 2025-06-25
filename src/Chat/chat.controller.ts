import { NextFunction } from "express";
import { Request, Response } from "express";
import { ChatService } from "./chat.service";

export const chatController = {
	getChats: async function getChats(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const userId = +res.locals.userId;
		const result = await ChatService.getChats(userId);
		if (result.status == "failure") {
			next(result);
			return;
		}
		res.json(result);
	},
	createChat: async function name(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const data: { id: number } = req.body;
		const userId = res.locals.userId;
		const result = await ChatService.createChat({
			contactId: data.id,
			userId: userId,
		});
		if (result.status == "failure") {
			next(result);
			return;
		}
		res.json(result);
	},
};
