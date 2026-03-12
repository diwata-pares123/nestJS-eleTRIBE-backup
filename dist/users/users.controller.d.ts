import { UsersService } from './users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createProfile(createProfileDto: CreateProfileDto, authHeader: string, req: any): Promise<{
        statusCode: number;
        data: {
            full_name: string;
            phone_number: string;
            role: string;
            terms_accepted_at: Date;
            user_id: string;
            is_verified: boolean;
            created_at: Date;
        };
    }>;
}
