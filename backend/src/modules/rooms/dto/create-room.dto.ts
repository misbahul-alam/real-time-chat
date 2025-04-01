import { IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  user_id: string;
}
