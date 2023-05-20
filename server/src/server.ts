import express, { Express, Request, Response } from "express";
import logger from "./config/logger";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

app.use("/test", (req: Request, res: Response) => {
  res.json({ success: true, message: "Welcome to TodoWebAPI" });
});

const PORT: string = process.env.PORT || "3000";
app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
});
