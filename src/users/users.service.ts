import { Injectable } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';

export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  role: Role;
}

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [
    {
      id: '1',
      email: 'test@test.com',
      username: 'john',
      password: 'changeme',
      role: Role.USER,
    },
    {
      id: '2',
      email: 'test@test.com',
      username: 'chris',
      password: 'secret',
      role: Role.USER,
    },
    {
      id: '3',
      email: 'test@test.com',
      username: 'maria',
      password: 'guess',
      role: Role.USER,
    },
  ];

  async findUserByname(username: string): Promise<IUser | undefined> {
    console.log(username);
    return this.users.find((user) => user.username === username);
  }

  async findUserByEmail(email: string): Promise<IUser | undefined> {
    console.log(email);
    return this.users.find((user) => user.email === email);
  }

  async findUserById(userId: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.id === userId);
  }
}
