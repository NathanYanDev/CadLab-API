import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Room } from "./Room";
import { User } from "./User";
import { Lab } from "./Lab";

@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lab, (lab) => lab.bookings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "labId" })
  lab: Lab;

  @Column()
  labId: number;

  @ManyToOne(() => Room, (room) => room.bookings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "roomId" })
  room: Room;

  @Column()
  roomId: number;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;

  @Column({ type: "timestamptz" })
  startTime: Date;

  @Column({ type: "timestamptz" })
  endTime: Date;

  @Column({ type: "text", nullable: true })
  purpose?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "text",
    default: "confirmed",
    enum: ["confirmed", "pending", "cancelled"],
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
