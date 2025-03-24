import { LoginDto } from './login.dto';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class RegisterDto extends LoginDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Password confirmation is required' })
  @IsStrongPassword({}, { message: 'Confirm password must be strong' })
  confirm_password: string;
}
