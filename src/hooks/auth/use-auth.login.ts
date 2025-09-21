import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

interface LoginData {
	login: string;
	password: string;
	rememberMe: boolean;
}

interface LoginResponse {
	success: boolean;
	error?: string;
}

export const useAuthLogin = () => {
	return useMutation<LoginResponse, Error, LoginData>({
		mutationFn: async (data: LoginData) => {
			const result = await signIn("credentials", {
				login: data.login,
				password: data.password,
				redirect: false,
			});

			if (result?.error) {
				throw new Error("Credenciais inválidas");
			}

			return { success: true };
		},
	});
};
