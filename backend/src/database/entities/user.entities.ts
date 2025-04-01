import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Message } from './message.entities';
import { RoomMember } from './room-member.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({
    length: 255,
    default:
      'https://res.cloudinary.com/misbahulalam/image/upload/v1742808267/profile-picture.png',
  })
  avatar: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Message, (message) => message.sender, { cascade: true })
  messages: Message[];

  @OneToMany(() => RoomMember, (roomMember) => roomMember.user)
  room_members: RoomMember[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
