const withPWA = require("next-pwa");
const prod = process.env.NODE_ENV === 'production'

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
    // disable: prod ? false : true,
  },
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com"],
  },
});