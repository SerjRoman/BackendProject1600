import { Request, Response, NextFunction} from "express"
import { UserService } from "./user.service"

export const UserController = {
    login: async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body
        const user = await UserService.login(data.email ,data.password)

        if (user.status === "failure"){
            next()
        }
    },

    register: async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body
        const user = await UserService.register(data)

        if (user.status === "failure"){
            next()
        }
    },

    user: async (req: Request, res: Response, next: NextFunction) => {
        // const result = await UserService.getUserById()
    }
}