import { prismaClient } from "@/adapters/db/prisma";
import { MembershipType } from "@/core/domain/dtos/membership-form.dto";

export class SearchMembershipApplicationService {
	async getById(id: string): Promise<MembershipType | Error> {
		try {
			const appication = await prismaClient.membershipApplication.findUnique({
				where: { id },
			});
			return appication as unknown as MembershipType;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error("An unknown error occurred during search");
		}
	}
}
