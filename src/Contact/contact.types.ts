import { Prisma } from "../generated/prisma";

export type Contact = Prisma.ContactGetPayload<{}>
export type ContactWhereUnique = Prisma.ContactWhereUniqueInput
export type CreateContact = Prisma.ContactCreateInput
export type ReceivedContact = {
    localName: string, 
    contactUserId: number,
    ownerId: number,
    avatar: string
}
// body = {ownerId, contactUserId}