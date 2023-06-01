/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//         config.node = {
//             net: 'empty'
//         };
//     }

//     return config;
// },
// resolve: {
//   fallback: {
//       "child_process": false, 
//       "process":  false, 
//       "fs": false, 
//       "util": false, 
//       "http": false,
//       "https": false,
//       "tls": false,
//       "net": false,
//       "crypto": false, 
//       "path": false,
//       "os": false, 
//       "stream": false,
//       "zlib": false
//   }
// }
}

module.exports = nextConfig
