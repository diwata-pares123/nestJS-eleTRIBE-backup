import { CreateProfileDto } from './dto/create-profile.dto';
export declare class UsersService {
    createProfile(userId: string, dto: CreateProfileDto): Promise<{
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
