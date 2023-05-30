import express, { Express, Request, Response } from "express";
import logger from "./config/logger";
import dotenv from "dotenv";
import TodoRouter from "./routes/todo.routes";
import UserRouter from "./routes/user.routes";
import AuthRouter from "./routes/auth.routes";
import { isAutheticated } from "./middleware/isAuthenticated";
import OtpRouter from "./routes/otp.routes";
import cors from "cors";
dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use("/test", (req: Request, res: Response) => {
  res.json({ success: true, message: "Welcome to TodoWebAPI" });
});

app.use("/api/v1", AuthRouter);
app.use("/api/v1", OtpRouter);
app.use(isAutheticated);
app.use("/api/v1/todo", TodoRouter);
app.use("/api/v1/user", UserRouter);

const PORT: string = process.env.PORT || "3000";
app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
});
