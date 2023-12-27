import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly role: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly userName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/, {
    message:
      'Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number.',
  })
  @IsNotEmpty()
  readonly password: string;
}
