import { AuthProvider } from "@/components/provides/auth-provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Partido Urubista",
	description: "A plataforma do urubismo",
	verification: {
		google: "SgaXQp6ouoWi-h_GlNEJe6Jj7qfb41CFnTs1P-ms89A",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className="antialiased">
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
