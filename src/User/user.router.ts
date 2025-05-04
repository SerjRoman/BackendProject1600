import {Router} from "express"
import { validateMiddleware } from "../middlewares/validate"
import { UserSchema } from "./user.schema"

const router = Router()

router.post("/login", validateMiddleware(UserSchema.login), )