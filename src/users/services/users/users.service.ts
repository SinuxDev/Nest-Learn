import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, username: 'Shinn', email: 'shinn@gmail.com' },
    { id: 2, username: 'Aung', email: 'aung@gmail.com' },
  ];

  fetchUsers() {
    return this.users;
  }

  createUsers(userData: CreateUserType) {
    const user = {
      id: Math.random(),
      ...userData,
    };

    this.users.push(user);

    return {
      message: 'User created successfully',
      user,
    };
  }

  fetchUserByID(id: number) {
    return this.users.find((user) => user.id === id) || null;
  }
}
