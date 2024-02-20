import injectWhyDidYouRender from "./scripts/why-did-you-render/index.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.buymeacoffee.com',
			},
		]
	},
	webpack: (config, context) => {
		injectWhyDidYouRender(config, context)
		return config;
	}
};

export default nextConfig;
