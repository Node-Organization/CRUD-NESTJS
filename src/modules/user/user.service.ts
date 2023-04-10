import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {

    constructor (private prisma: PrismaService) {}

    async createUser(data: UserDTO) {
        const existUser = await this.prisma.user.findMany({
            where: {
                email: data.email
            }
        });
        if (existUser) {
            throw new Error('Email already exists');
        }
        const user = await this.prisma.user.create({
            data: {
                name:   data.name,
                email:  data.email,
                active: data.active
            }
        });
        return user;
    }

    async findParamUser(id: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: parseInt(id)
            }
        });    
        if (!user) {
            throw new Error("User already exists");
        }    
        return user;
    }

    async update(id: string, data: UserDTO) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!userExists) {
            throw new Error("User already exists");
        }
        return await this.prisma.user.update({
            data: {
                email:  data.email,
                name:   data.name,
                active: data.active
            },
            where: {
                id: parseInt(id)
            }
        });
    }

    async delete(id: string): Promise<{ message: string; email: string }> {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!userExists) {
            throw new Error("User already exists");
        }
        await this.prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        return { message: "User deleted", email: userExists.email };
    }

}
