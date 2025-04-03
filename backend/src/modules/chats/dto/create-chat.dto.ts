import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  room_id: string;
  @IsNotEmpty()
  message: string;
}
