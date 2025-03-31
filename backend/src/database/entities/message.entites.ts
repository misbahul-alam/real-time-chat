import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entities';
import { Room } from './room.entites';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;
}
