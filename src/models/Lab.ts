import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Room } from "./Room";
import { Booking } from "./Booking";

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

  @OneToMany(() => Booking, (booking) => booking.lab, { cascade: true })
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
