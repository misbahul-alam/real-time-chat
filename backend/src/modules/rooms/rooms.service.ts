import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from 'src/database/entities/room.entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomMember } from 'src/database/entities/room-member.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(RoomMember)
    private readonly roomMemberRepository: Repository<RoomMember>,
  ) {}
  async create(createRoomDto: CreateRoomDto, adminId: string) {
    const room = await this.roomRepository.save({
      is_group: false,
    });
    const memberList = [
      {
        user: { id: adminId },
        role: 'admin',
        room,
      },
      {
        user: { id: createRoomDto.user_id },
        role: 'member',
        room,
      },
    ];

    await this.roomMemberRepository.save(memberList);
    return room;
  }

  async findAll(adminId: string) {
    const rooms = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.members', 'roomMember')
      .leftJoinAndSelect('roomMember.user', 'user')
      .addSelect(['user.id', 'user.name', 'user.email', 'user.avatar'])
      .getMany();

    // Update room name & avatar if they are null
    rooms.forEach((room) => {
      if (!room.name) {
        const otherMember = room.members.find(
          (member) => member.user.id !== adminId,
        );
        if (otherMember) {
          Object.assign(room, {
            name: otherMember.user.name,
            avatar: otherMember.user.avatar,
          });
        }
      }
    });

    return rooms;
  }

  async findOne(id: string, adminId: string) {
    const room = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.members', 'roomMember')
      .leftJoinAndSelect('roomMember.user', 'user')
      .addSelect(['user.id', 'user.name', 'user.email', 'user.avatar'])
      .where('room.id = :id', { id })
      .getOne();

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (!room.name) {
      const otherMember = room.members.find(
        (member) => member.user.id !== adminId,
      );
      if (otherMember) {
        Object.assign(room, {
          name: otherMember.user.name,
          avatar: otherMember.user.avatar,
        });
      }
    }

    return room;
  }
}
