import { Request, Response, NextFunction } from "express";
import { IFailure } from "../tools/result";
import { ErrorCodes } from "../types/error-codes";

// Request -> validateMiddleware -> controller -> service -> repository -> db
// {status: '',}
// Success -> res.json({})
// Failure
// Request - validateMiddleware -> controller -> errorHandlerMiddleware

export const errorHandlerMiddleware = (
	err: IFailure,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let httpCode: number;
	let message: string;

	switch (err.code) {
		case ErrorCodes.NOT_FOUND:
			httpCode = 404;
			message = "Resource not found";
			break;
		case ErrorCodes.EXISTS:
			httpCode = 409;
			message = "Resource exists";
			break;
		case ErrorCodes.UNAUTHORIZED:
			httpCode = 401;
			message = "Unauthorized";
			break;
		case ErrorCodes.VALIDATION:
			httpCode = 422
			message = "Validation error ,pishite pravilno"
			break
		default:
			httpCode = 500;
			message = "Internal server error";
			break;
		
	}
	res.status(httpCode).json({
		status: "failure",
		message: err.message ? err.message : message
	});
};
