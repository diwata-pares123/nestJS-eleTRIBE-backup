"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const supabase_js_1 = require("@supabase/supabase-js");
const pg_1 = __importDefault(require("pg"));
const pool = new pg_1.default.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
const supabaseUrl = 'https://rregfrhtlmfktliijzpd.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
let UsersService = class UsersService {
    async uploadFile(file, userId, fileType) {
        if (!file)
            return null;
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
    async createProfile(userId, dto) {
        try {
            const existingUser = await prisma.userProfile.findUnique({
                where: { phone_number: dto.phone_number }
            });
            if (existingUser)
                throw new common_1.ConflictException("Phone number already exists");
            const new_profile = await prisma.userProfile.create({
                data: {
                    user_id: userId,
                    full_name: dto.full_name,
                    email: dto.email,
                    phone_number: dto.phone_number,
                    role: dto.role,
                    is_verified: false,
                    terms_accepted_at: new Date(dto.terms_accepted_at),
                    driver_license_front_url: dto.driver_license_front_url,
                    driver_license_back_url: dto.driver_license_back_url,
                    vehicle_orcr_url: dto.vehicle_orcr_url,
                    selfie_url: dto.selfie_url,
                    dti_url: dto.dti_url,
                    mayors_permit_url: dto.mayors_permit_url,
                    proof_of_address_url: dto.proof_of_address_url,
                }
            });
            return { statusCode: 201, data: new_profile };
        }
        catch (error) {
            console.error('❌ Database Error:', error.message);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getProfileByToken(authHeader) {
        const token = authHeader.replace('Bearer ', '').trim();
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user)
            return null;
        const profile = await prisma.userProfile.findUnique({ where: { user_id: user.id } });
        if (!profile)
            return null;
        return {
            uid: profile.user_id,
            email: user.email,
            fullName: profile.full_name,
            phoneNumber: profile.phone_number,
            role: profile.role,
            status: profile.is_verified ? "ACTIVE" : "PENDING_APPROVAL",
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map