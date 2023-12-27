import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    console.log(email, pass);
    const user = await this.usersService.findUserByEmail(email);
    if (!user || user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    console.log('result', result, 'password', password);
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
