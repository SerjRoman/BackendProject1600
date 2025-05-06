import { ErrorCodes } from "../types/error-codes"

export interface ISuccess<T>{
    status: "success",
    data: T
}

export interface IFailure{
    status: "failure",
    message?: string,
    code?: ErrorCodes
}

export type Result<S> = ISuccess<S> | IFailure
export function success<T>(data: T): ISuccess<T>{
    return{
        status: "success",
        data: data
    }
}

export function failure(code?: ErrorCodes, message?: string) : IFailure{
    return{
        status: "failure",
        message: message,
        code: code
    }
}