import { configDotenv } from "dotenv"
import { StringValue } from "ms";

configDotenv()

export const Config = {
    SECRET_KEY: process.env.SECRET_KEY || "anton",
    AUTH_TOKEN_TTL: (process.env.AUTH_TOKEN_TTL || "7D") as StringValue // ttl = time to live
}