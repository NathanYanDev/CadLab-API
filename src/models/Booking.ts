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

@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
