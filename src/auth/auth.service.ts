import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<any> {
    console.log(loginUserDto);
    const user = await this.userService.getUserByUsername(
      loginUserDto.username,
    );

    if (!user || user?.password !== loginUserDto.password) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    console.log('result', result, 'password', password);

    const payload = {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
