import { UserService } from './user.service';
import { UserDTO } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: UserDTO): Promise<import(".prisma/client").User>;
    readUser(id: string): Promise<import(".prisma/client").User>;
    updataUser(id: string, data: UserDTO): Promise<import(".prisma/client").User>;
    deleteUser(id: string): Promise<{
        message: string;
        email: string;
    }>;
}
