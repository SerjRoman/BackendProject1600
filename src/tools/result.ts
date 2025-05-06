export interface ISuccess<T>{
    status: "success",
    data: T
}

export interface IFailure{
    status: "failure",
    message: string
}

export type Result<S> = ISuccess<S> | IFailure

export function success<T>(data: T): ISuccess<T>{
    return{
        status: "success",
        data: data
    }
}

export function failure(message: string){
    return{
        status: "failure",
        message: message
    }
}