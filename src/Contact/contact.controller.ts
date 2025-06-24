import { NextFunction, Request, Response } from "express";
import { ContactService } from "./contact.service";
import { failure } from "../tools/result";
import { ErrorCodes } from "../types/error-codes";

export const ContactController = {
	getContactById: async function (
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const id = req.params.id;
		// if NaN
		const result = await ContactService.getContactById(+id);
		if (result.status == "failure") {
			next(result);
			return;
		}
		res.json(result);
	},
	getAllContacts: async function (
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const userId: number = res.locals.userId;
		if (!userId) {
			next(failure(ErrorCodes.UNAUTHORIZED));
			return;
			// throw failure(ErrorCodes.UNAUTHORIZED)
		}
		const result = await ContactService.getAllContacts(userId);
		if (result.status == "failure") {
			next(result);
			return;
		}
        console.log(result)
		res.json(result);
	},
	createContact: async function (
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const body = req.body;
		body.ownerId = res.locals.userId;
		const result = await ContactService.createContact(body);
		if (result.status == "failure") {
			next(result);
			return;
		}
		res.json(result);
	},
};
