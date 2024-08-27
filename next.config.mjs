/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
  //     },
  //   ]
  // },
  experimental: {
    instrumentationHook: true,
  },

  webpack(config, { isServer }) {
    if (isServer) {
      config.resolve.alias['msw/browser'] = false
    } else {
      config.resolve.alias['msw/node'] = false
    }

    return config
  },
}

export default nextConfig
