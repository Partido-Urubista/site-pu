import { CreateMembershipApplicationController } from "@/adapters/api/controllers/membership-application-controller";
import { apiResponse, handleError } from "@/adapters/handlers";
import { NextRequest } from "next/server";

/**
 * Handles POST requests to create a new membership application.
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const controller = new CreateMembershipApplicationController();
		const response = await controller.execute(body);

		return apiResponse({
			status: response.status || 201,
			data: response,
		});
	} catch (error) {
		return handleError(error);
	}
}
