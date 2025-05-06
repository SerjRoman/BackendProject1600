import { PrismaClient, Prisma} from "../generated/prisma"




export const client = new PrismaClient()

export const PrismaKnownError = Prisma.PrismaClientKnownRequestError