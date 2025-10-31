import { Router } from "express";
import { BookingController } from "../controllers/bookingController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticateJWT);

/**
 * @swagger
 * /bookings:
 *  get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: All bookings retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Booking'
 */
router.get("/", BookingController.getAll);

/**
 * @swagger
 * /bookings/room/{roomId}:
 *  get:
 *     summary: Get bookings by room ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room
 *     responses:
 *      200:
 *        description: Bookings for the specified room retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Booking'
 */
router.get("/room/:roomId", BookingController.getByRoom);

/**
 * @swagger
 * /bookings/user/{userId}:
 *  get:
 *     summary: Get bookings by user ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *      200:
 *        description: Bookings for the specified user retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Booking'
 */
router.get("/user/:userId", BookingController.getByUser);

/**
 * @swagger
 * /bookings:
 *  post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *      201:
 *        description: Booking created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Booking'
 */
router.post("/", BookingController.create);

/**
 * @swagger
 * /bookings/{id}:
 *  delete:
 *     summary: Delete a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the booking to delete
 *     responses:
 *      200:
 *        description: Booking deleted successfully
 */
router.delete("/:id", BookingController.delete);

export default router;
