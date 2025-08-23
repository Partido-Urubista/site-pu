import { ResponseAPI } from "@/core/domain/dtos/response-api";
import { NextResponse } from "next/server";

/**
 * Creates a standard JSON response.
 * @param status The HTTP status code.
 * @param data The response body, conforming to ResponseAPI.
 * @returns A NextResponse object.
 */
export const apiResponse = ({
	status,
	data,
}: {
	status: number;
	data: ResponseAPI<unknown>;
}) => {
	return NextResponse.json(data, { status });
};

/**
 * Handles errors by creating a standardized error response.
 * @param error The caught error.
 * @returns A NextResponse object for the error.
 */
export const handleError = (error: unknown): NextResponse => {
	// Handle JSON parsing errors specifically
	if (error instanceof SyntaxError) {
		const response = ResponseAPI.error({
			message: "Invalid request body.",
			status: 400,
			errorMessage: error.message,
		});
		return apiResponse({ status: 400, data: response });
	}

	// Handle other known or unknown errors
	const response = ResponseAPI.error({
		message: "An error occurred while processing the request.",
		status: 500,
		errorMessage: error instanceof Error ? error.message : "Unknown error",
	});
	return apiResponse({ status: 500, data: response });
};
