import { CreateProfileDto } from './dto/create-profile.dto';
export declare class UsersService {
    createProfile(userId: string, dto: CreateProfileDto): Promise<{
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
