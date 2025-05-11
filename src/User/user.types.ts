import { Prisma } from "../generated/prisma";

export type User = Prisma.UserGetPayload<{}>;
export type CreateUser = Prisma.UserCreateInput;
export type FindUser = Prisma.UserWhereUniqueInput;
export type UserWithoutPassword = Prisma.UserGetPayload<{ omit: { password: true } }>;