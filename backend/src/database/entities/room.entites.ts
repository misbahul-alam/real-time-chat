import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entites';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  roomName: string;

  @Column({ nullable: true })
  roomAvatar: string;

  @Column()
  isGroup: boolean;
  @OneToMany(() => Message, (message) => message.id)
  messages: Message[];
}
