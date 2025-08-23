import { MembershipFormDTO } from "@/core/domain/dtos/membership-form.dto";
import { mutationOptions, MutationVariables } from "@/lib/mutation";
import DIContainer from "../../config/dicontainer/index";

const usecase = DIContainer.getMembershipUseCase();

export const getMembershipQueryKey = () => ["membership"];

export interface APICreateMembershipPayload {
	membership: MembershipFormDTO;
}

export const createMembershipOptions = () =>
	mutationOptions({
		mutationKey: [...getMembershipQueryKey(), "createMembershipApplication"],
		mutationFn: ({ payload }: MutationVariables<void, APICreateMembershipPayload>) =>
			usecase.create(payload.membership),
	});