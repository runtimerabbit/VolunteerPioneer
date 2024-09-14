import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import cors from "cors";
import authRouter from './routes/auth';
import eventRouter from './routes/events';
import userRouter from './routes/user';
const app: Express = express();
const port: number = parseInt(process.env.PORT) || 8000;


app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "PATCH", "DELETE", "POST"]
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => res.send("Hello from index"));
app.use("/auth", authRouter())
app.use("/events", eventRouter())
app.use("/users", userRouter())
app.listen(port, () => console.info(`Listening on port ${port}`));