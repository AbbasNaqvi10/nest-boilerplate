import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async updateUser(
    usertId: string,
    updateStudentDto: UpdateUserDto,
  ): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      usertId,
      updateStudentDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${usertId} not found`);
    }
    return existingUser;
  }

  async getAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('User data not found!');
    }
    return userData;
  }
  async getUser(userId: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(`Student #${userId} not found`);
    }
    return existingUser;
  }
  //   async deleteStudent(userId: string): Promise<IUser> {
  //     const deleteUser = await this.userModel.findByIdAndDelete(userId);
  //     if (!deleteUser) {
  //       throw new NotFoundException(`Student #${userId} not found`);
  //     }
  //     return deleteUser;
  //   }
}
