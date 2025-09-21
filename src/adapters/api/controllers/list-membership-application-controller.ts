import { MembershipType } from "@/core/domain/dtos/membership-form.dto";
import { ResponseAPI } from "@/core/domain/dtos/response-api";
import { ListMembershiopApplicationsService } from "../services/list-membership-applications-service";

export class ListMembershipApplicationController {
	private readonly listMembershipApplicationService =
		new ListMembershiopApplicationsService();
	async list(): Promise<ResponseAPI<MembershipType[]>> {
		try {
			const result = await this.listMembershipApplicationService.list();

			return new ResponseAPI({
				sucess: true,
				message: "Membership applications retrieved successfully",
				data: result,
				status: 200,
			});
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to retrieve membership applications";
			return new ResponseAPI({
				sucess: false,
				message: errorMessage,
				status: 500,
			});
		}
	}
}
