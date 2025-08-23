import { MembershipApplicationUseCase } from "../usecases/membership-application.usecase";
import { MembershipApplicationRepository } from "../repositories/membership-application.repoisitory";

class MembershipApplicationService implements MembershipApplicationUseCase {
	protected readonly adapter: MembershipApplicationRepository;

	constructor(adapter: MembershipApplicationRepository) {
		this.adapter = adapter;
	}
	async create(
		membershipApplication: import("@/core/domain/dtos/membership-form.dto").MembershipType
	): Promise<boolean> {
		return this.adapter.create(membershipApplication);
	}
}

export default MembershipApplicationService;
