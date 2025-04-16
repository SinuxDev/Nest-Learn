import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { request } from 'http';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  // @Get('users')
  // getUsers(@Query('sortBy') sortBy: string) {
  //   return {
  //     message: 'Users found',
  //     users: [
  //       { id: 1, name: 'John Doe' },
  //       { id: 2, name: 'Jane Doe' },
  //     ],
  //     sortBy,
  //   };
  // }

  @Get('users')
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Get('user/:id')
  getUserByID(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserByID(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'User found',
      user,
    };
  }

  // @Get('user/:id/:postID')
  // getUserByID(@Param('id') id: string, @Param('postID') postID: string) {
  //   return {
  //     message: 'User found',
  //     user: { id, postID },
  //   };
  // }

  // Post Method One
  // @Post('user')
  // createUser(@Req() request: Request, @Res() response: Response) {
  //   response.status(201).json({
  //     message: 'User created successfully',
  //     user: request.body,
  //   });
  // }

  // Post Method Two (UsePipes => Validation Pipe)
  @Post('user')
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUsers(userData);
  }
}
