"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
const pool = new pg_1.default.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
let UsersService = class UsersService {
    async createProfile(userId, dto) {
        try {
            const existingUser = await prisma.userProfile.findUnique({
                where: { phone_number: dto.phone_number }
            });
            if (existingUser) {
                throw new common_1.ConflictException({
                    statusCode: 409,
                    error: "Conflict",
                    message: "phone_number already exists"
                });
            }
            const new_profile = await prisma.userProfile.create({
                data: {
                    user_id: userId,
                    full_name: dto.full_name,
                    phone_number: dto.phone_number,
                    role: dto.role,
                    is_verified: false,
                    terms_accepted_at: new Date(dto.terms_accepted_at),
                }
            });
            return {
                statusCode: 201,
                data: new_profile
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException)
                throw error;
            throw new common_1.InternalServerErrorException({
                statusCode: 500,
                error: "Internal Server Error",
                message: "DB connection lost",
            });
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map