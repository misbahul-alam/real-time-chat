import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { WsJwtAuthGuard } from 'src/common/guards/ws-jwt-auth.guard';
import { RoomsService } from './rooms.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: 'rooms' })
@UseGuards(WsJwtAuthGuard)
export class RoomsGateway {
  constructor(private readonly roomsService: RoomsService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('users')
  async getUsers(@ConnectedSocket() client: Socket) {
    const user = client.handshake as unknown as { user: { id: string } };
    console.log({ user });

    const users = await this.roomsService.findAll(user.user.id);
    this.server.emit('users', users);

    return users;
  }
}
