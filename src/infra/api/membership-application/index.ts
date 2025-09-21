import { MembershipType } from "@/core/domain/dtos/membership-form.dto";
import { MembershipApplicationRepository } from "../../../core/repositories/membership-application.repoisitory";
import { apiClient } from "../client";

class MembershipApplicationAPI implements MembershipApplicationRepository {
	/**
	 * @param {MembershipType} membershipApplication
	 * @returns {Promise<boolean>}
	 */
	public async create(membershipApplication: MembershipType): Promise<boolean> {
		try {
			const response = await apiClient.post(
				"/membership-application",
				membershipApplication
			);
			const isCreated = response.data.success;

			return isCreated;
		} catch (error) {
			console.error("Failed to create membership application:", error);
			throw new Error(
				"The API request to create a membership application failed."
			);
		}
	}

	public async getAll(): Promise<MembershipType[]> {
		try {
			const response = await apiClient.get("/membership-application");
			return response.data as MembershipType[];
		} catch (error) {
			console.error("Failed to fetch membership applications:", error);
			throw new Error(
				"The API request to fetch membership applications failed."
			);
		}
	}

	public async getById(id: string): Promise<MembershipType | null> {
		try {
			const response = await apiClient.get(`/membership-application/${id}`);
			return response.data as MembershipType;
		} catch (error) {
			console.error(
				`Failed to fetch membership application with id ${id}:`,
				error
			);
			throw new Error(
				"The API request to fetch the membership application by ID failed."
			);
		}
	}
}

export default MembershipApplicationAPI;
