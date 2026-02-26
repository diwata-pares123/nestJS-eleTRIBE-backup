export declare enum UserRole {
    CUSTOMER = "CUSTOMER",
    DRIVER = "DRIVER",
    OPERATOR = "OPERATOR"
}
export declare class CreateProfileDto {
    full_name: string;
    phone_number: string;
    role: UserRole;
    terms_accepted_at: string;
    address_line_1?: string;
    city?: string;
    province?: string;
    postal_code?: string;
    date_of_birth?: string;
    gender?: string;
    emergency_contact_name?: string;
    emergency_contact_number?: string;
}
