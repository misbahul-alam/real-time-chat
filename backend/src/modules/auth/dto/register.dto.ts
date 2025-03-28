import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsEmail,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword({}, { message: 'Confirm password must be strong' })
  password: string;

  @IsNotEmpty({ message: 'Password confirmation is required' })
  confirm_password: string;
}
