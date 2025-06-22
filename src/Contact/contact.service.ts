import { Result } from "../tools/result";
import { Contact, ReceivedContact } from "./contact.types";
import { ContactRepository } from "./contact.repository";

export const ContactService = {
	getContactById: async function (id: number): Promise<Result<Contact>> {
		return await ContactRepository.getContact({ id });
	},

	getAllContacts: async function (
		userId: number
	): Promise<Result<Contact[]>> {
		const userContacts = await ContactRepository.getAllContacts(userId);
		return userContacts;
	},

	createContact: async function (
		data: ReceivedContact
	): Promise<Result<Contact>> {
		return await ContactRepository.createContact(data);
	},
};
