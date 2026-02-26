import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; // <--- THIS LINE IS KEY
import pg from 'pg';

// 1. Create the Postgres connection pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Initialize the Prisma Adapter
const adapter = new PrismaPg(pool);

// 3. Create the client using the adapter (Prisma 7 Requirement)
const prisma = new PrismaClient({ adapter });


@Injectable()
export class UsersService { 

  async createProfile(userId: string, dto: CreateProfileDto) {
    try {
      // --- STEP 12 & 13: PHONE NUMBER CONFLICT CHECK ---
      const existingUser = await prisma.userProfile.findUnique({
        where: { phone_number: dto.phone_number }
      });
      
      if (existingUser) {
        throw new ConflictException({
          statusCode: 409,
          error: "Conflict",
          message: "phone_number already exists"
        });
      }

      // --- STEP 15: SUCCESSFUL DATABASE INSERT ---
      const new_profile = await prisma.userProfile.create({
        data: {
          user_id: userId, // In production, this comes from the validated JWT
          full_name: dto.full_name,
          phone_number: dto.phone_number,
          role: dto.role,
          is_verified: false,
          terms_accepted_at: new Date(dto.terms_accepted_at),
        }
      });

      // --- STEP 16: SUCCESS RESPONSE ---
      return {
        statusCode: 201,
        data: new_profile
      };

    } catch (error) {
      if (error instanceof ConflictException) throw error;

      // --- STEP 14: BACKEND ERROR / SERVER CRASH ---
      throw new InternalServerErrorException({
        statusCode: 500,
        error: "Internal Server Error",
        message: "DB connection lost",
      });
    }
  }
}