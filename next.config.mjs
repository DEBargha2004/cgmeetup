/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'www.artstation.com'
      },
      {
        hostname: 'cdnb.artstation.com'
      },
      {
        hostname: 'cdna.artstation.com'
      }
    ]
  }
}

export default nextConfig
