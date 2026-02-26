import { UsersService } from './users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createProfile(createProfileDto: CreateProfileDto, authHeader: string, req: any): Promise<{
        statusCode: number;
        data: {
            user_id: string;
            full_name: string;
            phone_number: string;
            role: string;
            is_verified: boolean;
            terms_accepted_at: Date;
            created_at: Date;
        };
    }>;
}
