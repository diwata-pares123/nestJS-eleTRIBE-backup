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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfileDto = exports.UserRole = void 0;
const class_validator_1 = require("class-validator");
var UserRole;
(function (UserRole) {
    UserRole["CUSTOMER"] = "CUSTOMER";
    UserRole["DRIVER"] = "DRIVER";
    UserRole["OPERATOR"] = "OPERATOR";
})(UserRole || (exports.UserRole = UserRole = {}));
class CreateProfileDto {
    full_name;
    phone_number;
    role;
    terms_accepted_at;
    address_line_1;
    city;
    province;
    postal_code;
    date_of_birth;
    gender;
    emergency_contact_name;
    emergency_contact_number;
}
exports.CreateProfileDto = CreateProfileDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'full_name is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "full_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'phone_number is required' }),
    (0, class_validator_1.Matches)(/^\+63\d{10}$/, {
        message: 'phone_number must be E.164 format strictly starting with +63 followed by 10 digits (e.g., +639123456789)'
    }),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'role is required' }),
    (0, class_validator_1.IsEnum)(UserRole, { message: 'role must be a valid enum value (CUSTOMER, DRIVER, OPERATOR)' }),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'terms_accepted_at is required' }),
    (0, class_validator_1.IsDateString)({}, { message: 'terms_accepted_at must be a valid ISO-8601 date string' }),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "terms_accepted_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "address_line_1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "province", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}$/, { message: 'postal_code must be a 4-digit number' }),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "postal_code", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'date_of_birth must be a valid date string' }),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "date_of_birth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "emergency_contact_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\+63\d{10}$/, { message: 'emergency_contact_number must be a valid +63 number' }),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "emergency_contact_number", void 0);
//# sourceMappingURL=create-profile.dto.js.map