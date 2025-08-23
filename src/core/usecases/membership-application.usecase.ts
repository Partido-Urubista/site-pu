import { MembershipType } from "@/core/domain/dtos/membership-form.dto";

export interface MembershipApplicationUseCase {
  create(membershipApplication: MembershipType): Promise<boolean>;
}
