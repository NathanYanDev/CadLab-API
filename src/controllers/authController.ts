import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(User);
      const { name, email, password } = req.body;

      const existing = await repo.findOne({ where: { email } });
      if (existing)
        return res.status(400).json({ message: "Email já cadastrado" });

      const hashed = await bcrypt.hash(password, 10);
      const user = repo.create({ name, email, password: hashed });
      await repo.save(user);

      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async login(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    const user = await repo.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Usuário não encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Senha incorreta" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "8h",
    });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  }
}
