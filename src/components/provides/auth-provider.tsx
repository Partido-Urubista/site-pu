"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { QueryProvider } from "./query-provider";

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	return (
		<QueryProvider>
			<SessionProvider>{children}</SessionProvider>
		</QueryProvider>
	);
}
