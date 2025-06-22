import express from "express";
import { ContactController } from "./contact.controller";
import { validateMiddleware } from "../middlewares/validate";
import { ContactValidation } from "./contact.validate";
import { tokenExists } from "../middlewares/tokenExists";

const router = express.Router();
// router.use(tokenExists);

router.get("/", ContactController.getAllContacts);
router.get("/:id", ContactController.getContactById);
router.post(
	"/create",
	validateMiddleware(ContactValidation.contact),
	ContactController.createContact
);

export { router as ContactRouter };
