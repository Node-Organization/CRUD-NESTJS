"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prismaService_1 = require("../../database/prismaService");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(data) {
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
                name: data.name,
                email: data.email,
                active: data.active
            }
        });
        return user;
    }
    async findParamUser(id) {
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
    async update(id, data) {
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
                email: data.email,
                name: data.name,
                active: data.active
            },
            where: {
                id: parseInt(id)
            }
        });
    }
    async delete(id) {
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
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prismaService_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map