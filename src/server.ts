import express from "express";
import cors from "cors";
import { UserRouter } from "./User/user.router";
import { ContactRouter } from "./Contact/contact.router"
import {ChatRouter} from "./Chat/chat.router"
import { createServer } from "http";
import { authenticate } from "./middlewares/authenticate";
import { initSocketServer } from "./socket";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import { join } from "path";

const app = express();
const HOST = "192.168.0.115";
const PORT = 8000;

const httpServer = createServer(app)
initSocketServer(httpServer)

app.use(express.json({limit: '20mb'}));
app.use(cors());
app.use("/media/", express.static(join(__dirname, '../', '/media/')))
app.use(authenticate);
app.use("/api/users", UserRouter);
app.use("/api/contacts", ContactRouter)
app.use("/api/chats", ChatRouter)
app.use(errorHandlerMiddleware);

httpServer.listen(PORT, HOST, () => {
	console.log(`HTTP server is running on http://${HOST}:${PORT}`);
	console.log(`WebSocket server is running on ws://${HOST}:${PORT}`);
});

// Postman
