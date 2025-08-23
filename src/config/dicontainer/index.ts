import MembershipApplicationAPI from "@/infra/api/membership-application";
import MembershipApplicationService from "../../core/application/membership-application.service";

const DIContainer = {
	getMembershipUseCase: () =>
		new MembershipApplicationService(new MembershipApplicationAPI()),
};

export default DIContainer;
