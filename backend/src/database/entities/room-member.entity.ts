import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Room } from './room.entities';
import { User } from './user.entities';
import { RoomMemberRole } from '../../common/enums/room-member.enum';

@Entity('room_members')
export class RoomMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.room_members, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Room, (room) => room.members, {
    onDelete: 'CASCADE',
    eager: true,
  })
  room: Room;

  @Column({ default: RoomMemberRole.MEMBER, enum: RoomMemberRole })
  role: string;

  @CreateDateColumn()
  joined_at: Date;
}
