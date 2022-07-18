const withPWA = require("next-pwa");

// module.exports = {
//   images: {
//     domains: ["images.unsplash.com", "i.ytimg.com"],
//   },
// };


module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com"],
  },
});