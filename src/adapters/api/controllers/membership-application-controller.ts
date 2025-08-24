import { MembershipType } from "@/core/domain/dtos/membership-form.dto";
import { ResponseAPI } from "@/core/domain/dtos/response-api";
import { MembershipApplicationService } from "../services/membership-application-service";

export class MembershipApplicationController {
	private readonly membershipApplicationService: MembershipApplicationService =
		new MembershipApplicationService();

	async create(data: MembershipType): Promise<ResponseAPI<boolean>> {
		try {
			const result = await this.membershipApplicationService.create(data);

			return new ResponseAPI({
				sucess: true,
				message: "Membership application created successfully",
				data: result,
				status: 201,
			});
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to create membership application";
			return new ResponseAPI({
				sucess: false,
				message: errorMessage,
				status: 500,
			});
		}
	}
	async list(): Promise<ResponseAPI<MembershipType[]>> {
		try {
			const result = await this.membershipApplicationService.list();

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
