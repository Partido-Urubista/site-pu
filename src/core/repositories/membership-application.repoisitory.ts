import { MembershipType } from "@/core/domain/dtos/membership-form.dto";

export interface MembershipApplicationRepository {
	create(membershipApplication: MembershipType): Promise<boolean>;
}
