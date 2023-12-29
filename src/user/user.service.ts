import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    // Check if username is already in use
    const existingUsername = await this.isUsernameExist(username);
    console.log('existingUsername', existingUsername);
    if (existingUsername) {
      throw new NotFoundException('Username is already in use.');
    }

    const hashPassword = await this.hashPassword(password);
    const newUser = await new this.userModel({
      ...createUserDto,
      password: hashPassword,
    });
    return newUser.save();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const { username } = updateUserDto;

    // Check if username is already in use
    const existingUsername = await this.existingUserByUsername(
      userId,
      username,
    );
    if (existingUsername) {
      throw new NotFoundException('Username is already in use.');
    }

    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  async getAllUsers() {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('User data not found!');
    }
    return userData;
  }

  async getUser(userId: string) {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  async getUserByUsername(username: string) {
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${username} not found`);
    }
    return existingUser;
  }

  async deleteUser(userId: string) {
    const deleteUser = await this.userModel.findByIdAndDelete(userId);
    if (!deleteUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return deleteUser;
  }

  async isUsernameExist(username: string) {
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (!existingUser) {
      return false;
    }
    return true;
  }

  async existingUserByUsername(userId: string, username: string) {
    const existingUser = await this.userModel
      .findOne({ username, _id: { $ne: userId } })
      .exec();
    if (!existingUser) {
      return false;
    }
    return true;
  }
}
