import { Router } from "express"
import { validateMiddleware } from "../middlewares/validate"
import { UserSchema } from "./user.schema"
import { UserController } from "./user.controller"

const router = Router()

router.post("/login", validateMiddleware(UserSchema.login), UserController.login)