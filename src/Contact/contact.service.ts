import { failure, Result } from "../tools/result";
import { Contact, ReceivedContact } from "./contact.types";
import { ContactRepository } from "./contact.repository";
import { User } from "../User/user.types";
import { ErrorCodes } from "../types/error-codes";

export const ContactService = {
	getContactById: async function (id: number): Promise<Result<Contact>> {
		return await ContactRepository.getContact({ id });
	},
    
	getAllContacts: async function (userId: number): Promise<Result<User[]>> {
		const userContacts = await ContactRepository.getAllContacts(userId);
		if (!userContacts) {
			return failure(ErrorCodes.NOT_EXIST);
		}
		return userContacts
	},

	createContact: async function (
		data: ReceivedContact
	): Promise<Result<Contact>> {
		return await ContactRepository.createContact(data);
	},
};
