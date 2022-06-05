module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.infrastructureLogging = { debug: /PackFileCache/ }
    return config;
  },
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com"]
  }
}
