import { Router } from "express";
import { chatController } from "./chat.controller";

const router = Router();

router.get("/", chatController.getChats);
router.post("/create", chatController.createChat);
router.get("/chats-participants-info", chatController.getChatsParticipantsInfo)

export { router as ChatRouter };
