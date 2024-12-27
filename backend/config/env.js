import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  cookieExpiration: 24*60*60*1000
};
