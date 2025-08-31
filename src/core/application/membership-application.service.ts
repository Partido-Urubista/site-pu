import { MembershipType } from "@/core/domain/dtos/membership-form.dto";
import { MembershipApplicationRepository } from "../repositories/membership-application.repoisitory";
import { MembershipApplicationUseCase } from "../usecases/membership-application.usecase";

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

	async getAll(): Promise<MembershipType[]> {
		return this.adapter.getAll();
	}
	
	async getById(id: string): Promise<MembershipType | null> {
		return this.adapter.getById(id);
	}
}

export default MembershipApplicationService;
