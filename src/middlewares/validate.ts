import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema } from "yup";

export function validateMiddleware(schema: AnyObjectSchema) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
            req.body = await schema.validate(req.body)
			next()
			
		} catch (err) {
            console.log(err)
        }
	};
}

// /login -> {email: string()..., password: string().min(5 ,"")}
// /register -> {email: string, password: string, name: string, surname: string().min(10)}