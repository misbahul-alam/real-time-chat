import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/database/entities/message.entities';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  async create(createChatDto: CreateChatDto, userId: string) {
    const message = await this.messageRepository.save({
      room: { id: createChatDto.room_id },
      content: createChatDto.message,
      sender: { id: userId },
    });
    return message;
  }

  findAll() {
    return `This action returns all chats`;
  }
}
