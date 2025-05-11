import { Prisma } from "../generated/prisma";

export type UserWithOutPassword = Prisma.UserGetPayload<{ omit: { password: true } }>;
export type User = Prisma.UserGetPayload<{}>
export type CreateUser = Prisma.UserCreateInput;
export type FindUser = Prisma.UserWhereUniqueInput;
