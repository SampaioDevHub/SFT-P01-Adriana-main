/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Ajuda a detectar problemas no React
  swcMinify: true, // Usa o SWC para minificação mais rápida
  experimental: {
    turboMode: true, // Turbo Mode para builds mais rápidas
    optimizeCss: true, // Otimiza CSS para carregamento mais rápido
    serverActions: true, // Melhora a execução de APIs
  },
  images: {
    domains: ['example.com'], // Substitua pelo seu domínio de imagens
    formats: ['image/avif', 'image/webp'], // Formatos otimizados para imagens
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console.log em produção
  },
  output: "standalone", // Permite deploys mais eficientes em containers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
