import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Booking } from "../models/Booking";

export class BookingController {
  static async getAll(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Booking);
    const bookings = await repo.find({ relations: ["room", "user"] });
    return res.json(bookings);
  }

  static async getByRoom(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Booking);
    const bookings = await repo.find({
      where: { roomId: Number(req.params.roomId) },
      relations: ["room", "user"],
    });
    return res.json(bookings);
  }

  static async getByUser(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Booking);
    const bookings = await repo.find({
      where: { userId: Number(req.params.userId) },
      relations: ["room", "user"],
    });
    return res.json(bookings);
  }

  static async create(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Booking);
    const {
      roomId,
      labId,
      userId,
      startTime,
      endTime,
      purpose,
      description,
      status,
    } = req.body;

    const conflict = await repo
      .createQueryBuilder("booking")
      .where("booking.roomId = :roomId", { roomId })
      .andWhere(
        "(:start BETWEEN booking.startTime AND booking.endTime OR :end BETWEEN booking.startTime AND booking.endTime)",
        { start: startTime, end: endTime }
      )
      .getOne();

    if (conflict)
      return res
        .status(400)
        .json({ message: "Horário já reservado para esta sala" });

    const booking = repo.create({
      roomId,
      userId,
      labId,
      description,
      status,
      startTime,
      endTime,
      purpose,
    });
    await repo.save(booking);
    return res.status(201).json(booking);
  }

  static async delete(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Booking);
    await repo.delete(Number(req.params.id));
    return res.json({ message: "Agendamento removido" });
  }
}
