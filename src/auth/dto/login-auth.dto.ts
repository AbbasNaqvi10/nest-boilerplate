import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'email must be a valid email' })
  email: string;

  @IsNotEmpty()
  password: string;
}
