import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Room } from "./Room";

@Entity("labs")
export class Lab {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  location: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ default: 0 })
  capacity: number;

  @OneToMany(() => Room, (room) => room.lab, { cascade: true })
  rooms: Room[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
