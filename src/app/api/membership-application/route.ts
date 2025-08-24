import { MembershipApplicationController } from "@/adapters/api/controllers/membership-application-controller";
import { apiResponse, handleError } from "@/adapters/handlers";
import { NextRequest } from "next/server";

/**
 * Handles POST requests to create a new membership application.
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const controller = new MembershipApplicationController();
		const response = await controller.create(body);

		return apiResponse({
			status: response.status || 201,
			data: response,
		});
	} catch (error) {
		return handleError(error);
	}
}

export async function GET() {
	try {
		const controller = new MembershipApplicationController();
		const response = await controller.list();

		return apiResponse({
			status: response.status || 200,
			data: response,
		});
	} catch (error) {
		return handleError(error);
	}
}