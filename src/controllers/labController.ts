import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Lab } from "../models/Lab";

export class LabController {
  static async getAll(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Lab);
    const labs = await repo.find({ relations: ["rooms"] });
    return res.json(labs);
  }

  static async getOne(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Lab);
    const lab = await repo.findOne({
      where: { id: Number(req.params.id) },
      relations: ["rooms"],
    });
    if (!lab)
      return res.status(404).json({ message: "Laboratório não encontrado" });
    return res.json(lab);
  }

  static async create(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Lab);
    const newLab = {
      name: req.body.name,
      location: req.body.location,
      capacity: req.body.capacity,
      rooms: [],
      description: req.body.description,
    };
    const lab = repo.create(newLab);
    await repo.save(lab);
    return res.status(201).json(lab);
  }

  static async update(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Lab);
      const id = Number(req.params.id);

      let lab = await repo.findOneBy({ id });

      if (!lab) {
        return res.status(404).json({ message: "Laboratório não encontrado" });
      }

      repo.merge(lab, req.body);
      await repo.save(lab);

      const updatedLab = await repo.findOneBy({ id });

      return res.json(updatedLab);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar laboratório" });
    }
  }

  static async delete(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Lab);
    await repo.delete(Number(req.params.id));
    return res.json({ message: "Laboratório removido" });
  }
}
