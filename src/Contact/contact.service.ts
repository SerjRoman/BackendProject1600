import { Result } from "../tools/result";
import { Contact, CreateContact } from "./contact.types";
import { ContactRepository } from "./contact.repository";

export const ContactService = {
	getContactById: async function (id: number): Promise<Result<Contact>> {
		return await ContactRepository.getContact({ id });
	},
	getAllContacts: async function (): Promise<Result<Contact[]>> {
		return await ContactRepository.getAllContacts();
	},
	createContact: async function (
		data: CreateContact
	): Promise<Result<Contact>> {
		return await ContactRepository.createContact(data);
	},
};