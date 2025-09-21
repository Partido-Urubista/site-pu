import { ResponseAPI } from "@/core/domain/dtos/response-api";
import { SearchMembershipApplicationService } from "../services/search-membership-application-service";

export class SearcMembershipApplicationController {
	private readonly searchMembershipApplicationService =
		new SearchMembershipApplicationService();

	async getById(id: string): Promise<ResponseAPI<unknown>> {
		try {
			const result = await this.searchMembershipApplicationService.getById(id);

			return new ResponseAPI({
				sucess: true,
				message: "Membership application retrieved successfully",
				data: result,
				status: 200,
			});
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to retrieve membership application";

			return new ResponseAPI({
				sucess: false,
				message: errorMessage,
				status: 500,
			});
		}
	}
}
