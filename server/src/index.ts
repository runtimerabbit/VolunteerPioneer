import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
const app: Express = express();
const port: number = parseInt(process.env.PORT) || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => res.send("Hello"));

app.listen(port, () => console.info(`Listening on port ${port}`));