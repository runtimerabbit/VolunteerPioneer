import { Router } from "express"
import type { Response, Request } from "express"
import { getEvents, deleteEvent, createEvent, updateEvent, getEvent } from "../controllers/events"
import { supabase } from "../util/supabase"
import { isDate } from "util/types";

function eventRouter() {
    const router: Router = Router();
    router.post("/", async (req: Request, res: Response) => {
        const {title, description, date, location}: Record <string, string> = req.body;
        const token = req.get("x-access-token");
        if (!token){
            return res.status(401).send({error: "Unauthorized", status:401})
        }
        let {data:{user}} = await supabase.auth.getUser(token);
        if (!user) {
               return res.status(401).send({error: "Unauthorized", status:401})
        }
        let creator = user.id;
        let event = await createEvent(title, description, date, location, creator);
        return res.status(event.status).send(event);
    });
    router.get("/", async (req: Request, res: Response)=>{
        let events = await getEvents();
        return res.status(events.status).send(events)
    });
    router.get("/:id", async (req: Request, res: Response) => {
        let event = await getEvent(req.params.id)
        return res.status(event.status).send(event)
    });
    router.delete("/:id", async (req: Request, res: Response) => {
        const token = req.get("x-access-token");
        if (!token){
            return res.status(401).send({error: "Unauthorized", status:401})
        }
        let {data:{user}} = await supabase.auth.getUser(token);
        if (!user) {
               return res.status(401).send({error: "Unauthorized", status:401})
        }
        let userID = user.id;
        let event = await deleteEvent(req.params.id, userID)
        return res.status(event.status).send(event)
    });
    router.put("/", async (req: Request, res: Response) => {
        let token = req.get("x-access-token");
        if (!token){
            return res.status(401).send({error: "Unauthorized", status:401})
        }
        let {data:{user}} = await supabase.auth.getUser(token);
        if (!user) {
               return res.status(401).send({error: "Unauthorized", status:401})
        }
        let userId = user.id;
        const { title, description, date, location, id }: Record <string, string> = req.body;
        let event = await updateEvent(id, title, description, date, location, userId);
        return res.status(event.status).send(event)
    });
    return router;
}

export default eventRouter