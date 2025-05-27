import { NextFunction, Request, Response } from "express";
import { ContactService } from "./contact.service";

export const ContactController = {
	getContactById: async function (req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        // if NaN
		const result = await ContactService.getContactById(+id)
		if (result.status == "failure") {
			next(result);
			return;
		}
		res.json(result);
	},
	getAllContacts: async function (req: Request, res: Response, next: NextFunction) {
		const result = await ContactService.getAllContacts()
		if (result.status == "failure") {
			next(result);
            return;
		}
		res.json(result);
	},
	createContact: async function (req: Request, res: Response, next: NextFunction) {
        const body = req.body;
		body.ownerId = res.locals.userId
		const result = await ContactService.createContact(body)
		if (result.status == "failure") {
			next(result);
            return;
		}
		res.json(result);
	},
};