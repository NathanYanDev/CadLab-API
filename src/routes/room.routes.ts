import { Router } from "express";
import { RoomController } from "../controllers/roomController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

router.get("/", RoomController.getAll);
router.get("/lab/:labId", RoomController.getByLab);
router.post("/", RoomController.create);
router.put("/:id", RoomController.update);
router.delete("/:id", RoomController.delete);

export default router;
