import {Router} from "express"
import { validateMiddleware } from "../middlewares/validate"
import { UserSchema } from "./user.schema"

const router = Router()

router.post("/login", validateMiddleware(UserSchema.login), )
router.post("/register", validateMiddleware(UserSchema.register),)

router.get("/me")