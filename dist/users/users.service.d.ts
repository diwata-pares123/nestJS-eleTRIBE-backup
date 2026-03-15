import { CreateProfileDto } from './dto/create-profile.dto';
export declare class UsersService {
    uploadFile(file: Express.Multer.File, userId: string, fileType: string): Promise<string | null>;
    checkUserExists(email: string, phoneNumber: string): Promise<'email' | 'phone' | null>;
    createProfile(userId: string, dto: CreateProfileDto): Promise<{
        statusCode: number;
        data: {
            user_id: string;
            email: string;
            phone_number: string;
            full_name: string;
            role: string;
            is_verified: boolean;
            terms_accepted_at: Date;
            created_at: Date;
            driver_license_front_url: string | null;
            driver_license_back_url: string | null;
            vehicle_orcr_url: string | null;
            selfie_url: string | null;
            dti_url: string | null;
            mayors_permit_url: string | null;
            proof_of_address_url: string | null;
        };
    }>;
    getProfileByToken(authHeader: string): Promise<{
        uid: string;
        email: string | undefined;
        fullName: string;
        phoneNumber: string;
        role: string;
        status: string;
    } | null>;
}
