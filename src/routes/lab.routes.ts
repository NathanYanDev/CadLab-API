import { Router } from "express";
import { LabController } from "../controllers/labController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

router.get("/", LabController.getAll);
router.get("/:id", LabController.getOne);
router.post("/", LabController.create);
router.put("/:id", LabController.update);
router.delete("/:id", LabController.delete);

export default router;
