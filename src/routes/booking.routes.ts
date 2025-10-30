import { Router } from "express";
import { BookingController } from "../controllers/bookingController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

router.get("/", BookingController.getAll);
router.get("/room/:roomId", BookingController.getByRoom);
router.post("/", BookingController.create);
router.delete("/:id", BookingController.delete);

export default router;
