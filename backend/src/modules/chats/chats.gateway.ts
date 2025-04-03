import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from 'src/common/guards/ws-jwt-auth.guard';

@WebSocketGateway({ cors: true, namespace: 'chats' })
@UseGuards(WsJwtAuthGuard)
export class ChatsGateway {
  constructor(private readonly chatsService: ChatsService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('create')
  async create(
    @ConnectedSocket() client: { handshake: { user: { id: string } } },
    @MessageBody() createChatDto: CreateChatDto,
  ) {
    const user = client.handshake.user;

    const message = await this.chatsService.create(createChatDto, user.id);
    this.server.emit('message', message);
    console.log(message);
    return message;
  }

  @SubscribeMessage('findAllChats')
  findAll() {
    return this.chatsService.findAll();
  }
}
