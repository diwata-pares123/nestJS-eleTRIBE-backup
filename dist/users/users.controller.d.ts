import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createProfile(body: any, files: Array<Express.Multer.File>): Promise<{
        statusCode: number;
        data: {
            user_id: string;
            full_name: string;
            email: string;
            phone_number: string;
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
    getProfile(authHeader: string): Promise<{
        statusCode: number;
        data: {
            uid: string;
            email: string | undefined;
            fullName: string;
            phoneNumber: string;
            role: string;
            status: string;
        };
    }>;
}
