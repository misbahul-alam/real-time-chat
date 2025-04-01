import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entities';
import { RoomMember } from './room-member.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: false })
  is_group: boolean;

  @OneToMany(() => Message, (message) => message.room, { cascade: true })
  messages: Message[];

  @OneToMany(() => RoomMember, (roomMember) => roomMember.room)
  members: RoomMember[]; // List of members in this room
}
