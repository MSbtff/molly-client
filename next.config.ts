import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://3.35.175.203:8080/:path*', // 스프링 백엔드 주소
      },
    ];
  },

  images: {
    domains: ["3.35.175.203", "172.16.24.53"], // API에서 제공하는 이미지 도메인(IP) (외부 이미지 도메인 허용)
    remotePatterns: [
      {
        protocol: "http",
        hostname: "3.35.175.203",
        port: "8080",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "172.16.24.53", // 추가된 이미지 서버
        pathname: "/**",
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
