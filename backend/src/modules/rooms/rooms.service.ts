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
    return await this.roomRepository.save({
      members: [
        {
          user: { id: adminId },
          role: 'admin',
        },
        {
          user: { id: createRoomDto.user_id },
          role: 'member',
        },
      ],
    });
  }

  async findAll() {
    return await this.roomRepository.find({
      relations: ['members'],
    });
  }

  async findOne(id: string) {
    return await this.roomRepository.findOne({
      where: { id },
    });
  }
}
