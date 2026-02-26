import { 
  Controller, 
  Post, 
  Body, 
  Headers, 
  HttpCode, 
  HttpStatus,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('api/v1/users') // This sets up the base route
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * STEP 9: Business Profile Sync API Call
   * Endpoint: POST /api/v1/users/profile
   */
  @Post('profile')
  @HttpCode(HttpStatus.CREATED) // Explicitly return 201 Created on success
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Headers('authorization') authHeader: string
  ) {
    // 1. Check if the Authorization header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    // 2. Extract the JWT token
    const token = authHeader.split(' ')[1];

    // 3. Extract the UUID from the token. 
    // Note: In a production app, you will decode and verify the JWT signature here using a NestJS Guard.
    // For now, to keep the flow moving, we will simulate the extracted UUID from Supabase Auth (Step 8).
    const supabase_uuid = "uuid-xxxx-xxxx"; //

    // 4. Pass the extracted UUID and the validated body to your Service logic
    return this.usersService.createProfile(supabase_uuid, createProfileDto);
  }
}