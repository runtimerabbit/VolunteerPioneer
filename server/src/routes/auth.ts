import { Router } from "express";
import type { Request, Response } from "express";
import { signup, login } from "../controllers/auth"

function authRouter() {
    const router: Router = Router()
    router.get("/", (req: Request, res: Response) => {res.send("hi from auth")});
    router.post("/signup", async (req: Request, res: Response) => {
        const {email, password, username, accountType}: {email: string, password: string, username: string, accountType: string} = req.body
        const auth = await signup(email, password, username, accountType)
        return res.status(auth.status).send(auth)
    })
    router.post("/login", async (req: Request, res: Response) => {
        const {email, password}: {email: string, password: string} = req.body
        const auth = await login(email, password)
        return res.status(auth.status).send(auth)
    })
    return router
}

export default authRouter;