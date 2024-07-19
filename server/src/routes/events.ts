import { Router } from "express"
import type { Response, Request } from "express"

function eventRouter() {
    const router: Router = Router();
    router.post("/", async (req: Request, res: Response) => {

    });
    router.get("/:id", async (req: Request, res: Response) => {
        res.send(req.params.id);

    });
    router.delete("/:id", async (req: Request, res: Response) => {

    });
    router.put("/:id", async (req: Request, res: Response) => {

    });
    return router;
}

export default eventRouter

