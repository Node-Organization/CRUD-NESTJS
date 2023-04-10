import { PrismaService } from 'src/database/prismaService';
import { UserDTO } from './user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: UserDTO): Promise<import(".prisma/client").User>;
    findParamUser(id: string): Promise<import(".prisma/client").User>;
    update(id: string, data: UserDTO): Promise<import(".prisma/client").User>;
    delete(id: string): Promise<{
        message: string;
        email: string;
    }>;
}
