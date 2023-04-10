import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: UserDTO) {    
    try {      
      const user = await this.userService.createUser(data);
      return user;
    } catch (error) {
      throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      }, 
      HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async readUser(@Param('id') id: string ) {
    try {
      const user = await this.userService.findParamUser(id);
      return user;
    } catch (error) {
      throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      }, 
      HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updataUser(@Param('id') id: string, @Body() data: UserDTO) {
    try {
      return await this.userService.update(id, data);
    } catch (error) {
      throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      }, 
      HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.userService.delete(id);
    } catch (error) {
      throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      }, 
      HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
