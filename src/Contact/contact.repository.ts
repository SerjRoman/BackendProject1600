import { client, PrismaKnownError } from "../prisma/client";
import { Prisma } from "../generated/prisma";
import { Result, failure, success } from "../tools/result";
import { ErrorCodes, PrismaErrorCodes } from "../types/error-codes";
import { ContactWhereUnique, Contact, CreateContact, ReceivedContact } from "./contact.types";

export const ContactRepository = {
    getContact: async function (where: ContactWhereUnique): Promise<Result<Contact>> {
        try {
            const contacts = await client.contact.findUniqueOrThrow({
                where: where
            })
            return success(contacts)
        } catch (err) {
            if (err instanceof PrismaKnownError) {
				switch (err.code) {
					case PrismaErrorCodes.NOT_EXIST:
						return failure(ErrorCodes.NOT_FOUND);

					default:
						return failure(ErrorCodes.UNHANDLED);
				}
			}
			return failure(ErrorCodes.UNHANDLED);
        }
    },
    getAllContacts: async function (): Promise<Result<Contact[]>> {
        try {
            const contacts = await client.contact.findMany()
            return success(contacts)
        } catch (err) {
            if (err instanceof PrismaKnownError) {
				switch (err.code) {
					default:
						return failure(ErrorCodes.UNHANDLED);
				}
			}
			return failure(ErrorCodes.UNHANDLED);
        }
    },
    createContact: async function (data: ReceivedContact): Promise<Result<Contact>> {
        try {
            const contact = await client.contact.create({
                data: data
            })
            return success(contact)
        } catch (err) {
            if (err instanceof PrismaKnownError) {
				switch (err.code) {
					case PrismaErrorCodes.NOT_EXIST:
						return failure(ErrorCodes.NOT_FOUND);

					default:
						return failure(ErrorCodes.UNHANDLED);
				}
			}
			return failure(ErrorCodes.UNHANDLED);
        }
    }
}