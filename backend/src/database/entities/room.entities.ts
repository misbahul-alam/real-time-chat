import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entities';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  roomName: string;

  @Column({ nullable: true })
  roomAvatar: string;

  @Column({ default: false })
  isGroup: boolean;
  @OneToMany(() => Message, (message) => message.room, { cascade: true })
  messages: Message[];
}
