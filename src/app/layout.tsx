import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Partido Urubista",
	description: "A plataforma do urubismo",
	verification: {
		google: "google54c5b0c84abb80eb.html",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className="antialiased">{children}</body>
		</html>
	);
}
