import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
// import authRouter from './routes/auth';
import eventRouter from './routes/events';
const app: Express = express();
const port: number = parseInt(process.env.PORT) || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => res.send("Hello"));
// app.use("/auth", authRouter())
app.use("/events", eventRouter())
app.listen(port, () => console.info(`Listening on port ${port}`));

