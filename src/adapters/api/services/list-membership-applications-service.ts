import { prismaClient } from "@/adapters/db/prisma";
import { MembershipType } from "@/core/domain/dtos/membership-form.dto";

export class ListMembershiopApplicationsService {
	async list(): Promise<MembershipType[]> {
		try {
			const applications = await prismaClient.membershipApplication.findMany({
				orderBy: { createdAt: "asc" },
			});

			return applications as unknown as MembershipType[];
		} catch (error) {
			console.error("Error retrieving membership applications:", error);
			return [];
		}
	}
}
