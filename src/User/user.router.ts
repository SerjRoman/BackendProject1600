import { Router } from "express";
import { validateMiddleware } from "../middlewares/validate";
import { UserSchema } from "./user.schema";
import { UserController } from "./user.controller";

const router = Router();

router.post(
	"/login",
	validateMiddleware(UserSchema.login),
	UserController.login
);
router.post(
	"/register",
	validateMiddleware(UserSchema.register),
	UserController.register
);
router.get("/me", UserController.getMe);
router.get("/:username", UserController.getUserByUsername);

export { router as UserRouter };
