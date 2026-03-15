"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const users_service_1 = require("./users.service");
const create_profile_dto_1 = require("./dto/create-profile.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async checkUser(email, phone) {
        if (!email && !phone)
            return { available: true };
        const conflict = await this.usersService.checkUserExists(email, phone);
        if (conflict === 'email') {
            throw new common_1.ConflictException("This email address is already registered.");
        }
        if (conflict === 'phone') {
            throw new common_1.ConflictException("This phone number is already registered.");
        }
        return { available: true };
    }
    async createProfile(body, files) {
        const supabase_uuid = body.user_id;
        if (!supabase_uuid)
            throw new common_1.BadRequestException("user_id from Supabase is required");
        if (!body.email)
            throw new common_1.BadRequestException("Email is required for profile creation");
        const dto = new create_profile_dto_1.CreateProfileDto();
        dto.full_name = body.full_name;
        dto.email = body.email;
        dto.phone_number = body.phone_number;
        dto.role = body.role;
        dto.terms_accepted_at = body.terms_accepted_at;
        dto.address_line_1 = body.address_line_1;
        dto.city = body.city;
        dto.province = body.province;
        dto.postal_code = body.postal_code;
        dto.date_of_birth = body.date_of_birth;
        dto.gender = body.gender;
        dto.emergency_contact_name = body.emergency_contact_name;
        dto.emergency_contact_number = body.emergency_contact_number;
        const upload = async (file, type) => {
            if (!file)
                return undefined;
            const url = await this.usersService.uploadFile(file, supabase_uuid, type);
            return url ?? undefined;
        };
        if (files && files.length > 0) {
            if (dto.role === create_profile_dto_1.UserRole.DRIVER) {
                const licenseFront = files.find(f => f.fieldname === 'driverLicenseFront');
                const licenseBack = files.find(f => f.fieldname === 'driverLicenseBack');
                const vehicleFile = files.find(f => f.fieldname === 'vehicleFile');
                const selfieFile = files.find(f => f.fieldname === 'selfieFile');
                dto.driver_license_front_url = await upload(licenseFront, 'license-front');
                dto.driver_license_back_url = await upload(licenseBack, 'license-back');
                dto.vehicle_orcr_url = await upload(vehicleFile, 'orcr');
                dto.selfie_url = await upload(selfieFile, 'selfie');
            }
            if (dto.role === create_profile_dto_1.UserRole.OPERATOR) {
                const dtiFile = files.find(f => f.fieldname === 'dtiFile');
                const permitFile = files.find(f => f.fieldname === 'permitFile');
                const proofFile = files.find(f => f.fieldname === 'proofFile');
                dto.dti_url = await upload(dtiFile, 'dti');
                dto.mayors_permit_url = await upload(permitFile, 'permit');
                dto.proof_of_address_url = await upload(proofFile, 'proof-address');
            }
        }
        return this.usersService.createProfile(supabase_uuid, dto);
    }
    async getProfile(authHeader) {
        if (!authHeader)
            throw new common_1.BadRequestException("Missing Authorization header");
        const profile = await this.usersService.getProfileByToken(authHeader);
        if (!profile)
            throw new common_1.NotFoundException("Profile does not exist for this user");
        return { statusCode: 200, data: profile };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('check-user'),
    __param(0, (0, common_1.Query)('email')),
    __param(1, (0, common_1.Query)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkUser", null);
__decorate([
    (0, common_1.Post)('profile'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createProfile", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map