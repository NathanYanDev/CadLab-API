import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Room } from "../models/Room";
import { Lab } from "../models/Lab";

export class RoomController {
  static async getAll(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Room);
    const rooms = await repo.find({ relations: ["lab"] });
    return res.json(rooms);
  }

  static async getByLab(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Room);
    const rooms = await repo.find({
      where: { labId: Number(req.params.labId) },
    });
    return res.json(rooms);
  }

  static async create(req: Request, res: Response) {
    const userRepo = AppDataSource.getRepository(Room);
    const labRepo = AppDataSource.getRepository(Lab);
    const lab = await labRepo.findOneBy({ id: req.body.labId });

    console.log("LabID: ", lab);
    console.log("Requested LabID: ", req.body.labId);

    if (!lab) {
      return res.status(400).json({ message: "Laboratório inválido" });
    }

    const newRoom = {
      name: req.body.name,
      capacity: req.body.capacity,
      description: req.body.description,
      labId: req.body.labId,
      lab,
      bookings: [],
    };

    const room = userRepo.create(newRoom);
    await userRepo.save(room);
    return res.status(201).json(room);
  }

  static async update(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Room);
    const room = await repo.findOneBy({ id: Number(req.params.id) });
    if (!room) return res.status(404).json({ message: "Sala não encontrada" });

    repo.merge(room, req.body);
    await repo.save(room);
    return res.json(room);
  }

  static async delete(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Room);
    await repo.delete(Number(req.params.id));
    return res.json({ message: "Sala removida" });
  }
}
