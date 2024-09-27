import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  private users = [
    {
      id: 1,
      name: 'dato',
      email: 'd@gmail.com',
      subscriptionStart: new Date().toISOString(),
      subscriptionEnd: new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      ).toISOString(),
    },
    {
      id: 2,
      name: 'giorgi',
      email: 'g@gmail.com',
      subscriptionStart: new Date().toISOString(),
      subscriptionEnd: new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      ).toISOString(),
    },
    {
      id: 3,
      name: 'luka',
      email: 'l@gmail.com',
      subscriptionStart: new Date().toISOString(),
      subscriptionEnd: new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      ).toISOString(),
    },
    {
      id: 4,
      name: 'nika',
      email: 'n@gmail.com',
      subscriptionStart: new Date().toISOString(),
      subscriptionEnd: new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      ).toISOString(),
    },
    {
      id: 5,
      name: 'sandro',
      email: 's@gmail.com',
      subscriptionStart: new Date().toISOString(),
      subscriptionEnd: new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      ).toISOString(),
    },
  ];





  create(createUserDto: CreateUserDto) {
    if (!createUserDto.name || !createUserDto.email) {
      throw new HttpException(
        'Name and Email are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const subscriptionStart = new Date();
    const subscriptionEnd = new Date(subscriptionStart);
    subscriptionEnd.setMonth(subscriptionStart.getMonth() + 1);

    const lastId = this.users[this.users.length - 1]?.id || 1;

    const newUser = {
      id: lastId + 1,
      subscriptionStart: subscriptionStart.toISOString(),
      subscriptionEnd: subscriptionEnd.toISOString(),
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }


  findAll() {
    return this.users;
  }

  findOne(id: number) {
    if (!id) throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    const existingUser = this.users.find((el) => el.id === id);
    if (!existingUser)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return existingUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (!id || !updateUserDto.email || !updateUserDto.name) {
      throw new HttpException(
        'Name, and Email are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    const updatedUser = {
      ...this.users[index],
      ...updateUserDto,
    };

    this.users[index] = updatedUser;
    return updatedUser;
  }

  
  remove(id: number) {
    if (!id) throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    const deletedUser = this.users.splice(index, 1);
    return deletedUser;
  }
}
