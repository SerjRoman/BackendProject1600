import { InferType } from "yup";
import { UserSchema } from "./user.schema";
import { UserRepository } from "./user.repository";
import { failure, Result, success, IFailure } from "../tools/result";
import { sign } from "jsonwebtoken";
import { Config } from "../config/config";
import { compare, hash } from "bcryptjs";
import { ErrorCodes } from "../types/error-codes";

export const UserService = {
    login: async (
        data: InferType<typeof UserSchema.login>
    ): Promise<Result<string>> => {
        const result = await UserRepository.find({
            email: data.email,
        });

        if (result.status === "failure") {
            return result;
        }
        const isMatch = await compare(data.password, result.data.password);
        if (!isMatch) {
            return failure(ErrorCodes.UNAUTHORIZED);
        }
        const token = sign(result, Config.SECRET_KEY, {
            expiresIn: Config.AUTH_TOKEN_TTL,
        });
        return success(token);
    },
    register: async (
        data: InferType<typeof UserSchema.register>
    ): Promise<Result<string>> => {
        const user = await UserRepository.find({ email: data.email });
        if (user.status === "failure") {
            return user;
        }
        if (user) {
            return failure(ErrorCodes.EXISTS);
        }

        const hashedPassword = await hash(data.password, 10);
		const hashedData = {
			...data,
			password: hashedPassword
		}
		const newUser = await UserRepository.create(hashedData)
        
		const token = sign(newUser, Config.SECRET_KEY, {
            expiresIn: Config.AUTH_TOKEN_TTL,
        })

        return success(token)
		
    },
    getMe: async (userId: number) => {
        const user = await UserRepository.find({ id: userId });
        if (!user) {
            return failure(ErrorCodes.UNAUTHORIZED);
        }
        return success(user);
    },
};
