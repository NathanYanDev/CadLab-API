import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Lab } from "./Lab";
import { Booking } from "./Booking";

@Entity("rooms")
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ default: 0 })
  capacity: number;

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => Lab, (lab) => lab.rooms, { onDelete: "CASCADE" })
  @JoinColumn({ name: "labId" })
  lab: Lab;

  @Column()
  labId: number;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
