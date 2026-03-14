-- CreateTable
CREATE TABLE "USER_FACT_TABLE" (
    "user_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "terms_accepted_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "driver_license_front_url" TEXT,
    "driver_license_back_url" TEXT,
    "vehicle_orcr_url" TEXT,
    "selfie_url" TEXT,
    "dti_url" TEXT,
    "mayors_permit_url" TEXT,
    "proof_of_address_url" TEXT,

    CONSTRAINT "USER_FACT_TABLE_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_FACT_TABLE_email_key" ON "USER_FACT_TABLE"("email");

-- CreateIndex
CREATE UNIQUE INDEX "USER_FACT_TABLE_phone_number_key" ON "USER_FACT_TABLE"("phone_number");
