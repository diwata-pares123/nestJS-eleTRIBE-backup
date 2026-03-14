import { Controller, Post, Get, Body, Headers, HttpCode, HttpStatus, UseInterceptors, UploadedFiles, BadRequestException, NotFoundException } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateProfileDto, UserRole } from './dto/create-profile.dto';

@Controller('api/v1/users') 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('profile')
  @HttpCode(HttpStatus.CREATED) 
  @UseInterceptors(AnyFilesInterceptor())
  async createProfile(
    @Body() body: any, 
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    // 1. Authenticate the real Supabase ID
    const supabase_uuid = body.user_id; 
    if (!supabase_uuid) throw new BadRequestException("user_id from Supabase is required");
    if (!body.email) throw new BadRequestException("Email is required for profile creation");

    // 2. Map standard text fields to the DTO
    const dto = new CreateProfileDto();
    dto.full_name = body.full_name;
    dto.email = body.email;
    dto.phone_number = body.phone_number;
    dto.role = body.role as UserRole;
    dto.terms_accepted_at = body.terms_accepted_at;
    
    // 3. Map extra scalability fields
    dto.address_line_1 = body.address_line_1;
    dto.city = body.city;
    dto.province = body.province;
    dto.postal_code = body.postal_code;
    dto.date_of_birth = body.date_of_birth;
    dto.gender = body.gender;
    dto.emergency_contact_name = body.emergency_contact_name;
    dto.emergency_contact_number = body.emergency_contact_number;

    // 4. Helper function to process file uploads cleanly
    const upload = async (file: Express.Multer.File | undefined, type: string) => {
      if (!file) return undefined;
      const url = await this.usersService.uploadFile(file, supabase_uuid, type);
      return url ?? undefined;
    };

    // 5. Route specific files based on User Role
    if (files && files.length > 0) {
      
      // --- DRIVER ACCOUNT CREATION LOGIC ---
      if (dto.role === UserRole.DRIVER) {
        const licenseFront = files.find(f => f.fieldname === 'driverLicenseFront');
        const licenseBack = files.find(f => f.fieldname === 'driverLicenseBack');
        const vehicleFile = files.find(f => f.fieldname === 'vehicleFile');
        const selfieFile = files.find(f => f.fieldname === 'selfieFile');

        dto.driver_license_front_url = await upload(licenseFront, 'license-front');
        dto.driver_license_back_url = await upload(licenseBack, 'license-back');
        dto.vehicle_orcr_url = await upload(vehicleFile, 'orcr');
        dto.selfie_url = await upload(selfieFile, 'selfie');
      }

      // --- OPERATOR ACCOUNT CREATION LOGIC ---
      if (dto.role === UserRole.OPERATOR) {
        const dtiFile = files.find(f => f.fieldname === 'dtiFile');
        const permitFile = files.find(f => f.fieldname === 'permitFile');
        const proofFile = files.find(f => f.fieldname === 'proofFile');

        dto.dti_url = await upload(dtiFile, 'dti');
        dto.mayors_permit_url = await upload(permitFile, 'permit');
        dto.proof_of_address_url = await upload(proofFile, 'proof-address');
      }
    }

    // 6. Send the perfectly formatted payload to the Database
    return this.usersService.createProfile(supabase_uuid, dto);
  }

  @Get('profile')
  async getProfile(@Headers('authorization') authHeader: string) {
    if (!authHeader) throw new BadRequestException("Missing Authorization header");
    
    const profile = await this.usersService.getProfileByToken(authHeader);
    
    if (!profile) throw new NotFoundException("Profile does not exist for this user");
    
    return { statusCode: 200, data: profile };
  }
}