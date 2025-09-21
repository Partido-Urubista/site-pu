import { apiResponse } from "@/adapters/handlers";
import { SearcMembershipApplicationController } from "../../../../adapters/api/controllers/search-membership-application-controller";
import { ResponseAPI } from "@/core/domain/dtos/response-api";

export async function GET(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await context.params;
		const controller = new SearcMembershipApplicationController();
		const response = await controller.getById(id);
		return apiResponse({
			status: response.status || 200,
			data: response,
		});
	} catch (error) {
		return apiResponse({
			status: 500,
			data: new ResponseAPI({
				sucess: false,
				message:
					error instanceof Error
						? error.message
						: "Failed to retrieve membership application",
				status: 500,
			}),
		});
	}
}
