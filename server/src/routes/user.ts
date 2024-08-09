import { Router } from "express";
import { Response, Request } from "express";
import { supabase } from "../util/supabase";
import { getUser, createUser } from "../controllers/user"

function userRouter() {
    const router: Router = Router()
    router.post("/", async (req: Request, res: Response) => {
        const {name, profilePicture} : Record <string, string> = req.body;
        const token = req.get("x-access-token");
        if (!token){
            return res.status(401).send({error: "Unauthorized", status:401})
        }
        let {data:{user}} = await supabase.auth.getUser(token);
        if (!user) {
               return res.status(401).send({error: "Unauthorized", status:401})
        }
        let createdUser = await createUser(name, profilePicture, user.id)
        return res.status(createdUser.status).send(createdUser)
    });
    router.get("/", async (req: Request, res: Response) => {
        const token = req.get("x-access-token");
        if (!token){
            return res.status(401).send({error: "Unauthorized", status:401})
        }
        let {data:{user}} = await supabase.auth.getUser(token);
        if (!user) {
               return res.status(401).send({error: "Unauthorized", status:401})
        }
        let currentUser = await getUser(user.id);
        return res.status(currentUser.status).send(currentUser)
        // Get the user based on the user id from user
    });

    return router;
}

export default userRouter