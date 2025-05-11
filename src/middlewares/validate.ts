import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema, ValidationError } from "yup";
import { failure } from "../tools/result";
import { ErrorCodes } from "../types/error-codes";

export function validateMiddleware(schema: AnyObjectSchema) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			req.body = await schema.validate(req.body);
			next();
		} catch (err) {
			// if (err instanceof ValidationError) {
			// }
			console.log(err);
			next(failure(ErrorCodes.VALIDATION));
		}
	};
}

// /login -> {email: string()..., password: string().min(5 ,"")}
// /register -> {email: string, password: string, name: string, surname: string().min(10)}
