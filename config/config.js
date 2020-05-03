const config = {
  server: {
    port: process.env.PORT || 8080,
    hostname: "127.0.0.1",
  },
  database: {
    url: "mongodb://localhost:27017/crownstack",
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtSession: {
      session: false,
    },
    timeout: 1 * 365 * 24 * 60, // in minutes (expires after 1 year)
    temporary_timeout: 5, // in minutes
  },
  rootPath: require("path").resolve(__dirname + "/../"),
};
module.exports = config;