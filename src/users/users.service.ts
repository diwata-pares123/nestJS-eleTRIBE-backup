import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; 
import { createClient } from '@supabase/supabase-js';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const supabaseUrl = 'https://rregfrhtlmfktliijzpd.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''; 
const supabase = createClient(supabaseUrl, supabaseKey);

@Injectable()
export class UsersService { 

  async uploadFile(file: Express.Multer.File, userId: string, fileType: string): Promise<string | null> {
    if (!file) return null;
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${userId}-${fileType}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('documents')
      .upload(fileName, file.buffer, { contentType: file.mimetype, upsert: true });

    if (error) {
      console.error(`❌ Storage Error [${fileType}]:`, error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage.from('documents').getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  }

  async createProfile(userId: string, dto: CreateProfileDto) {
    try {
      const existingUser = await prisma.userProfile.findUnique({
        where: { phone_number: dto.phone_number }
      });
      
      if (existingUser) throw new ConflictException("Phone number already exists");

      const new_profile = await prisma.userProfile.create({
        data: {
          user_id: userId,
          full_name: dto.full_name,
          email: dto.email,
          phone_number: dto.phone_number,
          role: dto.role,
          is_verified: false,
          terms_accepted_at: new Date(dto.terms_accepted_at),
          
          // Driver Fields
          driver_license_front_url: dto.driver_license_front_url,
          driver_license_back_url: dto.driver_license_back_url,
          vehicle_orcr_url: dto.vehicle_orcr_url,
          selfie_url: dto.selfie_url,

          // Operator Fields (FIXED!)
          dti_url: dto.dti_url,
          mayors_permit_url: dto.mayors_permit_url,
          proof_of_address_url: dto.proof_of_address_url,
        }
      });

      return { statusCode: 201, data: new_profile };
    } catch (error: any) {
      console.error('❌ Database Error:', error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getProfileByToken(authHeader: string) {
    const token = authHeader.replace('Bearer ', '').trim();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return null;

    const profile = await prisma.userProfile.findUnique({ where: { user_id: user.id } });
    if (!profile) return null;

    return {
      uid: profile.user_id,
      email: user.email,
      fullName: profile.full_name,
      phoneNumber: profile.phone_number,
      role: profile.role,
      status: profile.is_verified ? "ACTIVE" : "PENDING_APPROVAL",
    };
  }
}