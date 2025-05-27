import express from "express";
import cors from "cors";
import { UserRouter } from "./User/user.router";
import { authenticate } from "./middlewares/authenticate";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";

const app = express();
const HOST = "192.168.0.115";
const PORT = 8000;

app.use(express.json());
app.use(
	cors({
		origin: "exp://192.168.0.115:8081",
		methods: ["GET", "POST"],
	})
);

app.use(authenticate);
app.use("/users", UserRouter);
app.use(errorHandlerMiddleware);

app.listen(PORT, HOST, () => {
	console.log(`server is running on http://${HOST}:${PORT}`);
});

// Postman
