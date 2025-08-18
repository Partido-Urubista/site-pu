-- CreateEnum
CREATE TYPE "public"."OnlinePresence" AS ENUM ('Slightly_Active', 'Moderately_Online', 'Chronically_Online');

-- CreateEnum
CREATE TYPE "public"."DisruptionLevel" AS ENUM ('Beginner', 'Intermediate_Disruptor', 'Master_Theorist');

-- CreateEnum
CREATE TYPE "public"."CurrentSituation" AS ENUM ('High_School', 'College', 'Technical_School', 'Applying_To_College', 'Working', 'Unemployed');

-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('OK', 'UNUSUAL', 'CLEAR');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'EDITOR');

-- CreateTable
CREATE TABLE "public"."membership_applications" (
    "id" TEXT NOT NULL,
    "applicationNumber" SERIAL NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "discordId" TEXT,
    "age" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "youtubeChannels" TEXT NOT NULL,
    "onlinePresence" "public"."OnlinePresence" NOT NULL,
    "disruptionLevel" "public"."DisruptionLevel" NOT NULL,
    "politicalIdeology" TEXT NOT NULL,
    "neurodivergence" TEXT,
    "currentSituation" "public"."CurrentSituation" NOT NULL,
    "howDidYouHear" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'OK',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "membership_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'EDITOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "membership_applications_applicationNumber_key" ON "public"."membership_applications"("applicationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");
