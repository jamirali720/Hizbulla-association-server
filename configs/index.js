const dotenv = require ("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_URI,
  saltRound: process.env.SALT_ROUNDS,
  jwtAccessTokenSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,

  jwtAccessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION,

  adminEmail: process.env.ADMIN_EMAIL,
  NODE_ENV: process.env.NODE_ENV, 
  smtpPassword: process.env.SMTP_PASSWORD_TWO,
};
