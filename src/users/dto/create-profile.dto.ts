import { 
  IsString, 
  IsNotEmpty, 
  Matches, 
  IsEnum, 
  IsDateString, 
  IsEmail,
  IsOptional 
} from 'class-validator';

// Defining the strict roles allowed by your architecture
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  DRIVER = 'DRIVER',
  OPERATOR = 'OPERATOR',
}

export class CreateProfileDto {
  @IsNotEmpty({ message: 'full_name is required' })
  @IsString()
  full_name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
  

  // STRICT VALIDATION: Must start with +63 exactly, followed by 10 digits
  @IsNotEmpty({ message: 'phone_number is required' })
  @Matches(/^\+63\d{10}$/, { 
    message: 'phone_number must be E.164 format strictly starting with +63 followed by 10 digits (e.g., +639123456789)' 
  })
  phone_number: string;

  @IsNotEmpty({ message: 'role is required' })
  @IsEnum(UserRole, { message: 'role must be a valid enum value (CUSTOMER, DRIVER, OPERATOR)' })
  role: UserRole;

  @IsNotEmpty({ message: 'terms_accepted_at is required' })
  @IsDateString({}, { message: 'terms_accepted_at must be a valid ISO-8601 date string' })
  terms_accepted_at: string;

  // ==========================================
  // 8 EXTRA SCALABILITY FIELDS (snake_case)
  // ==========================================

  @IsOptional()
  @IsString()
  address_line_1?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @Matches(/^\d{4}$/, { message: 'postal_code must be a 4-digit number' }) // PH Zip Code format
  postal_code?: string;

  @IsOptional()
  @IsDateString({}, { message: 'date_of_birth must be a valid date string' })
  date_of_birth?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  emergency_contact_name?: string;

  @IsOptional()
  @Matches(/^\+63\d{10}$/, { message: 'emergency_contact_number must be a valid +63 number' })
  emergency_contact_number?: string;

  // ==========================================
  // DRIVER SPECIFIC FIELDS
  // ==========================================

  @IsOptional()
  @IsString()
  driver_license_front_url?: string;

  @IsOptional()
  @IsString()
  driver_license_back_url?: string;

  @IsOptional()
  @IsString()
  vehicle_orcr_url?: string;

  @IsOptional()
  @IsString()
  selfie_url?: string;

  // ==========================================
  // OPERATOR SPECIFIC FIELDS (ADD THESE!)
  // ==========================================

  @IsOptional()
  @IsString()
  dti_url?: string;

  @IsOptional()
  @IsString()
  mayors_permit_url?: string;

  @IsOptional()
  @IsString()
  proof_of_address_url?: string;
}