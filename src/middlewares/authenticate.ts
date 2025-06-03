import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ErrorCodes } from "../types/error-codes";
import { Config } from "../config/config";
import { failure } from "../tools/result";

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;
	console.log(authHeader);
	if (!authHeader) {
		console.log("Auth header not supplied");
		next();
		return;
	}
	const [schema, token] = authHeader.split(" ");
	if (!schema || schema.toLowerCase() !== "bearer" || !token) {
		next(failure(ErrorCodes.UNAUTHORIZED));
		return;
	}
	let payload;
	try {
		payload = verify(token, Config.SECRET_KEY) as Record<string, string>;
	} catch (err) {
		console.log("Token verification failed", err);
		next(failure(ErrorCodes.UNAUTHORIZED));
		return;
	}
	res.locals.userId = payload.userId;
	next();
};
