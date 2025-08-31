import { useMutation } from "@tanstack/react-query";
import { getMembershipByIdOptions } from "../options/membership-application";

export function useGetMembershipById(id: string) {
	const {
		mutate: getById,
		data,
		isPending: isLoading,
		isError,
		error,
	} = useMutation({
		...getMembershipByIdOptions(),
		mutationKey: ["getMembershipById", id],
	});

	const fetchMembershipById = () => {
		getById({ payload: { id } });
	};

	return {
		fetchMembershipById,
		data,
		isLoading,
		isError,
		error,
	};
}
