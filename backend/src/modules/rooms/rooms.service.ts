import { Injectable } from '@nestjs/common';
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

  async findAll() {
    const room = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.members', 'roomMember')
      .leftJoinAndSelect('roomMember.user', 'user')
      .addSelect(['user.id', 'user.name', 'user.email', 'user.avatar'])
      .getMany();

    return room;
  }

  async findOne(id: string, adminId: string) {
    const room = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.members', 'roomMember')
      .leftJoinAndSelect('roomMember.user', 'user')
      .addSelect(['user.id', 'user.name', 'user.email', 'user.avatar'])
      .where('room.id = :id', { id })
      .getOne();

    if (room?.name === null) {
      room.members.forEach((member) => {
        if (member.user.id !== adminId) {
          room.name = member.user.name;
          room.avatar = member.user.avatar;
        }
      });
    }

    return room;
  }
}
