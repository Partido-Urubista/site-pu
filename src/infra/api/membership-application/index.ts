import { MembershipType } from "@/core/domain/dtos/membership-form.dto";
import { MembershipApplicationRepository } from "../../../core/repositories/membership-application.repoisitory";
import { apiClient } from "../client";

class MembershipApplicationAPI
	implements MembershipApplicationRepository
{
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
}

export default MembershipApplicationAPI;
