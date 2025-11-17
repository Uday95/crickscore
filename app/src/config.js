module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "change_this_secret",
  REDIS_URL: process.env.REDIS_URL || "redis://redis:6379",
  MYSQL_HOST: process.env.MYSQL_HOST || "mysql",
  MYSQL_USER: process.env.MYSQL_USER || "root",
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "rootpass",
  MYSQL_DB: process.env.MYSQL_DB || "cricscore"
};