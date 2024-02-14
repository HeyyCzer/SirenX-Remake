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
};

export default nextConfig;
