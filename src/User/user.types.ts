import { Prisma } from "../generated/prisma";

export type User = Prisma.UserGetPayload<{ omit: { password: true } }>;
export type CreateUser = Prisma.UserCreateInput;
export type FindUser = Prisma.UserWhereUniqueInput;
