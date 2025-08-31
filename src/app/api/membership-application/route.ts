import { ListMembershipApplicationController } from "@/adapters/api/controllers/list-membership-application-controller";
import { apiResponse, handleError } from "@/adapters/handlers";
import { NextRequest } from "next/server";
import { CreateMembershipApplicationController } from "./../../../adapters/api/controllers/create-membership-application-controller";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const controller = new CreateMembershipApplicationController();
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
		const controller = new ListMembershipApplicationController();
		const response = await controller.list();

		return apiResponse({
			status: response.status || 200,
			data: response,
		});
	} catch (error) {
		return handleError(error);
	}
}
