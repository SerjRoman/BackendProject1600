import { Request, Response, NextFunction } from "express"
import { IFailure } from "../tools/result"

export enum ErrorCodes {
    USER_EXISTS = "USER_EXISTS"
}

export const errorHandlerMiddleware = (
    err: IFailure,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(err)
    // switch case вместо if'ов
    if (err.message === ErrorCodes.USER_EXISTS) {
        res.status(409).json(err)
        return
    }
    res.status(500).json(err)
}
