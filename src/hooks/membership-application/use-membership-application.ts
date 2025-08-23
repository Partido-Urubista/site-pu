import '@ant-design/v5-patch-for-react-19';

import type { MembershipType } from "@/core/domain/dtos/membership-form.dto";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { message } from "antd";

import {
	createMembershipOptions,
	getMembershipQueryKey,
} from "../options/membership-application";

const queryClient = new QueryClient();

export function useMembershipCreate() {
	const { mutate: createMembership, ...mutation } = useMutation({
		...createMembershipOptions(),
		mutationKey: getMembershipQueryKey(),
		onSuccess: () => {
			setTimeout(() => {
				message.success(
					"Sua solicitação de adesão foi criada com sucesso! Em breve entraremos em contato."
				);
			}, 0);
			queryClient.invalidateQueries({ queryKey: getMembershipQueryKey() });
		},
		onError: (error) => {
			message.error(
				`Ocorreu um erro ao criar a solicitação de adesão... por favor tente novamente mais tarde.`
			);
			console.error("Error creating membership application:", error);
		},
	}, queryClient);

	const submitMembership = (membership: MembershipType) => {
		createMembership({ payload: { membership } });
	};

	return {
		createMembership: submitMembership,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
		data: mutation.data,
	};
}
