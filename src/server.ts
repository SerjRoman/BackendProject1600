import express from "express";
import cors from "cors";
import { UserRouter } from "./User/user.router";
import { authenticate } from "./middlewares/authenticate";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import { join } from "path";

const app = express();
const HOST = "localhost";
const PORT = 8000;

app.use(express.json({limit: '20mb'}));
app.use(cors());
app.use("/media/", express.static(join(__dirname, '../', '/media/')))
app.use(authenticate);
app.use("/api/users", UserRouter);
app.use(errorHandlerMiddleware);

app.listen(PORT, HOST, () => {
	console.log(`server is running on http://${HOST}:${PORT}`);
});

// Postman
