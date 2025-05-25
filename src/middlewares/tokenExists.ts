import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Config } from "../config/config";

interface IToken {
    exp: number, 
    iat: number,
    id: number
}

export const tokenExists = (
	req: Request,
	res: Response,
	next: NextFunction
) => {

	const authorization = req.headers.authorization;
    // якщо немає хедера
	if (!authorization) {
		res.status(401).json({
			status: "failure",
			message: "Authorization required",
		});
		return;
	}

	const [type, token] = authorization.split(" ");

	if (!token || type != "Bearer") {
		res.status(401).json({
			status: "failure",
			message: "Authorization format is invalid оr token not correct",
		});
		return;
	}
	try {
        // перевірка на співпадіння токену
		const decodedToken = verify(token, Config.SECRET_KEY) as IToken;
		res.locals.userId = decodedToken.id;
		next();
	} catch (error) {
		res.status(401).json({ status: "failure", message: "Token error" });
	}
};
