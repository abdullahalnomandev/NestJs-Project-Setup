import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/users.schema';
import QueryBuilder from 'src/builder/QueryBuilder';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async findAll(query: Record<string, any>) {
    const userQuery = new QueryBuilder(this.userModel.find(), query)
      .search(['name', 'email'])
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await userQuery.modelQuery;
    const pagination = userQuery.getPaginationInfo();
    return {
      data: result,
      meta: pagination,
    };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    return { message: 'User deleted successfully', deletedUser };
  }
}
