import dotenv from "dotenv";
dotenv.config();

const Configs = {
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/myblog',
    PORT: process.env.PORT ||8080,
    JWT_SECRET: process.env.JWT_SECRET || "secret" ,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    JWT_REFRESH_COOKIE_NAME: process.env.JWT_REFRESH_COOKIE_NAME,
}

export default Configs;