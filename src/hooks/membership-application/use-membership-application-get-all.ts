import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { getAllMembershipsOptions } from "../options/membership-application";

export function useMembershipGetAll() {
	const { data: applications, isPending: isLoading } = useMutation({
		...getAllMembershipsOptions(),
		mutationKey: ["membership", "getAllMemberships"],
		onError: (error) => {
			message.error(
				`Ocorreu um erro ao buscar as solicitações de adesão... por favor tente novamente mais tarde.`
			);
			console.error("Error fetching membership applications:", error);
		},
	});

	return { applications, isLoading };
}
