import { Prisma } from "../generated/prisma";
import { getErrorMessage, prisma } from "../prisma";

export const UserRepository = {
	async findUserByEmail(email: string) {
		try {
			return await prisma.user.findUniqueOrThrow({
				where: { 
                    email: email 
                },
			});
		} catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError){
                console.log(err)
                return getErrorMessage(err.code)
            }
            return "Unexpected error";
        }
	},

    async findUserById(id: number){
        try {
			return await prisma.user.findUniqueOrThrow({
				where: { 
                    id: id
                },
			});
		} catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError){
                console.log(err)
                return getErrorMessage(err.code)
            }
            return "Unexpected error";
        }
    },

    async createUser(data: Prisma.UserCreateInput){
        try {
            return await prisma.user.create({
                data: data,
            });;
        }catch(err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError){
                console.log(err)
                return getErrorMessage(err.code)
            }
            return "Unexpected error";
        }
    }
};
