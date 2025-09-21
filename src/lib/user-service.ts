import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "./auth-utils";

const prisma = new PrismaClient();

export interface CreateUserData {
	email: string;
	password: string;
	role?: Role;
}

export async function createUser(userData: CreateUserData) {
	const { email, password, role = Role.EDITOR } = userData;

	const existingUser = await prisma.user.findUnique({
		where: { email },
	});

	if (existingUser) {
		throw new Error("Usuário com este email já existe");
	}

	const passwordHash = await hashPassword(password);

	const user = await prisma.user.create({
		data: {
			email,
			passwordHash,
			role,
		},
		select: {
			id: true,
			email: true,
			role: true,
			createdAt: true,
		},
	});

	return user;
}

export async function getUserByEmail(email: string) {
	return await prisma.user.findUnique({
		where: { email },
		select: {
			id: true,
			email: true,
			passwordHash: true,
			role: true,
		},
	});
}
