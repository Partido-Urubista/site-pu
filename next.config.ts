/* eslint-disable @typescript-eslint/no-explicit-any */

//** @type {import('next').NextConfig} */
const nextConfig = {
	// Outras configurações que você possa ter...

	webpack: (
		config: {
			externals: string[];
			module: { rules: { test: RegExp; use: string }[] };
		},
		{ isServer }: any
	) => {
		if (!isServer) {
			config.externals.push("zlib-sync", "discord.js");
		}
		config.module.rules.push({
			test: /\.node$/,
			use: "node-loader",
		});

		return config;
	},
};

export default nextConfig;
