-- Create enums
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'ADMIN', 'PROFESSIONAL');
CREATE TYPE "AppointmentStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED', 'NO_SHOW');
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAST_DUE', 'CANCELED', 'TRIAL');
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'OTHER');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'CANCELED');

CREATE TABLE "Salon" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "phone" TEXT,
  "whatsapp" TEXT,
  "email" TEXT,
  "address" TEXT,
  "city" TEXT,
  "state" TEXT,
  "logoUrl" TEXT,
  "openingTime" TEXT NOT NULL DEFAULT '08:00',
  "closingTime" TEXT NOT NULL DEFAULT '18:00',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Salon_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'OWNER',
  "salonId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Professional" (
  "id" TEXT NOT NULL,
  "salonId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "specialty" TEXT,
  "phone" TEXT,
  "email" TEXT,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Professional_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Service" (
  "id" TEXT NOT NULL,
  "salonId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "durationMinutes" INTEGER NOT NULL,
  "price" DECIMAL(10,2) NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Client" (
  "id" TEXT NOT NULL,
  "salonId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Appointment" (
  "id" TEXT NOT NULL,
  "salonId" TEXT NOT NULL,
  "clientId" TEXT NOT NULL,
  "professionalId" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "date" DATE NOT NULL,
  "startTime" TEXT NOT NULL,
  "endTime" TEXT NOT NULL,
  "status" "AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED',
  "price" DECIMAL(10,2) NOT NULL,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SubscriptionPlan" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "price" DECIMAL(10,2) NOT NULL,
  "maxProfessionals" INTEGER NOT NULL,
  "maxAppointmentsPerMonth" INTEGER NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Subscription" (
  "id" TEXT NOT NULL,
  "salonId" TEXT NOT NULL,
  "planId" TEXT NOT NULL,
  "status" "SubscriptionStatus" NOT NULL DEFAULT 'TRIAL',
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Payment" (
  "id" TEXT NOT NULL,
  "salonId" TEXT NOT NULL,
  "appointmentId" TEXT,
  "amount" DECIMAL(10,2) NOT NULL,
  "method" "PaymentMethod" NOT NULL DEFAULT 'PIX',
  "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
  "paidAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Review" (
  "id" TEXT NOT NULL,
  "salonId" TEXT NOT NULL,
  "clientId" TEXT NOT NULL,
  "appointmentId" TEXT NOT NULL,
  "rating" INTEGER NOT NULL,
  "comment" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AvailabilityBlock" (
  "id" TEXT NOT NULL,
  "salonId" TEXT NOT NULL,
  "professionalId" TEXT NOT NULL,
  "date" DATE NOT NULL,
  "startTime" TEXT NOT NULL,
  "endTime" TEXT NOT NULL,
  "reason" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AvailabilityBlock_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Salon_slug_key" ON "Salon"("slug");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "Professional_salonId_idx" ON "Professional"("salonId");
CREATE UNIQUE INDEX "Service_salonId_name_key" ON "Service"("salonId", "name");
CREATE INDEX "Service_salonId_idx" ON "Service"("salonId");
CREATE UNIQUE INDEX "Client_salonId_phone_key" ON "Client"("salonId", "phone");
CREATE INDEX "Client_salonId_idx" ON "Client"("salonId");
CREATE INDEX "Appointment_salonId_date_idx" ON "Appointment"("salonId", "date");
CREATE UNIQUE INDEX "SubscriptionPlan_name_key" ON "SubscriptionPlan"("name");
CREATE UNIQUE INDEX "Subscription_salonId_key" ON "Subscription"("salonId");
CREATE UNIQUE INDEX "Payment_appointmentId_key" ON "Payment"("appointmentId");
CREATE INDEX "Payment_salonId_idx" ON "Payment"("salonId");
CREATE INDEX "Review_salonId_idx" ON "Review"("salonId");
CREATE INDEX "AvailabilityBlock_salonId_date_idx" ON "AvailabilityBlock"("salonId", "date");

ALTER TABLE "User" ADD CONSTRAINT "User_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Professional" ADD CONSTRAINT "Professional_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Service" ADD CONSTRAINT "Service_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Client" ADD CONSTRAINT "Client_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AvailabilityBlock" ADD CONSTRAINT "AvailabilityBlock_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AvailabilityBlock" ADD CONSTRAINT "AvailabilityBlock_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
