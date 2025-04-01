import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../database/entities/user.entities';
import { Response } from 'express';
import { CustomJwtPayload } from '../../common/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: CustomJwtPayload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 30 * 60 * 60 * 24 * 1000, // 30 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.json({ access_token, user: { ...user, password: undefined } });
  }
  async register(registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.confirm_password) {
      throw new BadRequestException(
        'Password and Confirm Password do not match',
      );
    }

    const user = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.userRepository.save({
      name: registerDto.name,
      email: registerDto.email,
      password: hashPassword,
    });

    return newUser;
  }
}
