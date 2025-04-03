import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/database/entities/message.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
